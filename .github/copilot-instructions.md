<!-- Copilot instructions for Graykids-Academy -->
# Copilot instructions — Graykids Academy

Resumen rápido
- Proyecto: sitio estático frontend (páginas en `src/pages/`) que usa Firebase Auth + Firestore para autenticación y datos.
- El sitio gestiona sesión con Firebase Auth y además sincroniza estado visible con `localStorage` y cookies (`user_session`, `is_logged_in`).

Arquitectura y componentes clave
- Autenticación: `src/scripts/firebase-init.js` (config), `src/pages/Login.html` (handlers de login, `handlePostLogin`), `src/pages/oauth-callback.html` (callback OAuth simulado para desarrollo).
- Persistencia/guardas: `src/scripts/auth-guard.js` (funciones `persistSession`, `guardPage`), `src/scripts/session-manager.js` (observador `onAuthStateChanged` y renderizado del header).
- UI / navegación: `src/scripts/header.js` (menu/header behaviors) y los archivos en `src/pages/`.

Flujos importantes (por qué y cómo funcionan)
- Al iniciar sesión: Firebase Auth mantiene el usuario; el frontend llama `handlePostLogin` (en `Login.html`) o `persistSession` (en `auth-guard.js`) para guardar `localStorage` + cookies y redirigir.
- Al cargar páginas: varias páginas usan `onAuthStateChanged(auth, ...)` para restaurar sesión y/o redirigir automáticamente (por ejemplo `Login.html` redirige si existe usuario activo). Busca `onAuthStateChanged`.
- Comunicación entre componentes: se usa `localStorage` + cookies como mecanismo de señalización entre páginas (p. ej. `user`, `isLoggedIn`, `user_session`). No hay backend centralizado enviando `HttpOnly` cookies.

Convenciones y patrones específicos del proyecto
- Claves persistentes: `localStorage` keys: `user`, `isLoggedIn`, `emailVerifications`, `coursesData`, etc. Cookies: `user_session`, `is_logged_in`.
- Cookies: se crean con `SameSite=Lax;Secure` en varios lugares (`Login.html`, `oauth-callback.html`, `auth-guard.js`). Al eliminar cookies debes usar los mismos atributos — ver `auth-guard.js` (se ajustó recientemente para respetar `Secure`).
- Duplicación: hay dos helpers que persisten sesión: `persistSession` (in `auth-guard.js`) y `persistUserSession` (in `Login.html`). Un agente que modifique la persistencia debe localizar y actualizar ambos para mantener consistencia.

Prácticas de edición seguras (para el agente)
- Siempre buscar estas cadenas antes de editar sesión/auth: `user_session`, `is_logged_in`, `isLoggedIn`, `persistSession`, `persistUserSession`, `handlePostLogin`, `onAuthStateChanged`.
- Evitar cambios que asuman un backend: actualmente `oauth-callback.html` simula intercambio de tokens en el cliente (no seguro). No conviertas esto a producción sin agregar un backend y mover `HttpOnly` cookies al servidor.
- No asumas que `file://` funciona: Firebase Auth y OAuth requieren servir sobre `http(s)`. Recomendación local: usar un servidor estático.

Comandos y flujos de desarrollo
- Servir localmente (desde la raíz del repo) — Windows `cmd.exe`:
```
cd "c:\Users\user\Desktop\Graykids Academy"
python -m http.server 8000
```
- Alternativa: usar la extensión Live Server de VS Code o cualquier servidor estático; asegúrate de abrir `http://localhost:8000/` en el navegador (no `file://`).

Puntos que requieren atención al hacer cambios
- Redirecciones automáticas: `Login.html` contiene un observer que llama `handlePostLogin` y redirige si hay un usuario activo. Si quieres permitir permanecer en la página, añade una excepción basada en query param (por ejemplo `?stay=true`) o modifica el observer cuidadosamente.
- Cookie/security: si añades/eliminás cookies que contienen información de sesión, mantén consistencia de atributos `SameSite`/`Secure` al crear y eliminar.
- Buscar duplicados: cuando cambies la forma de persistir sesión o el nombre de una `localStorage` key, actualiza: `Login.html`, `oauth-callback.html`, `auth-guard.js`, `session-manager.js`, `curso-player.html`, `campus.html`, `admin.html`.

Ejemplos concretos desde el código (búsquedas útiles)
- `onAuthStateChanged(auth, async (user) => { ... })` — aparece en `src/scripts/session-manager.js` y en `src/pages/Login.html`.
- `persistSession(user, extra)` — en `src/scripts/auth-guard.js` (central para borrado/creación de cookies y localStorage).
- `persistUserSession(userInfo)` — en `src/pages/Login.html` (duplicado de persistencia; revisa si sincronizar).
- Cookies creadas con `document.cookie = ...;SameSite=Lax;Secure` — revisa `src/pages/Login.html` y `src/pages/oauth-callback.html`.

Qué priorizar para PRs pequeños
- Unificar helpers de cookie/session en `src/scripts/cookie-utils.js` y reemplazar usos (reduce bugs como eliminación inconsistente).
- Evitar redirecciones inesperadas en `Login.html` (hacer que `?stay=true` prevenga la redirección automática).
- Reforzar aviso en código que `oauth-callback.html` es para desarrollo y NO intercambia tokens en producción.

Preguntas que deberías hacer al usuario si algo no está claro
- ¿Quieres mantener la simulación de OAuth en el frontend o migrarla a backend? (impacta la forma segura de almacenar tokens)
- ¿Prefieres un helper compartido para cookies ahora o solo correcciones puntuales?

Fin de instrucciones: pide feedback si algo no está cubierto o quieres que fusione estas reglas con un README existente.
