# Graykids Academy - React App

Aplicación web de Graykids Academy migrada a React.

## 🚀 Inicio Rápido

### Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

### Compilar para producción

```bash
npm run build
```

Esto creará una carpeta `build/` con los archivos optimizados listos para subir a tu hosting.

## 📁 Estructura del Proyecto

```
graykids-academy/
├── public/
│   ├── images/          # Imágenes estáticas
│   └── index.html      # HTML principal
├── src/
│   ├── components/     # Componentes React
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Courses.js
│   │   └── ...
│   ├── hooks/          # Hooks personalizados
│   │   ├── useHeader.js
│   │   ├── useCourses.js
│   │   └── useAnimations.js
│   ├── config/         # Configuración
│   │   └── firebase.js
│   ├── styles/         # Archivos CSS
│   │   ├── Normalize.css
│   │   └── estilos.css
│   ├── assets/         # Recursos (imágenes, etc.)
│   ├── App.js          # Componente principal
│   └── index.js        # Punto de entrada
└── package.json
```

## 🔧 Características

- ✅ Migración completa a React
- ✅ Componentes reutilizables
- ✅ Hooks personalizados para lógica de negocio
- ✅ Integración con Firebase (Firestore)
- ✅ Animaciones y efectos visuales
- ✅ Diseño responsive
- ✅ Menú móvil funcional

## 📝 Notas

- Las imágenes están en `public/images/` y `src/assets/images/`
- Los estilos CSS originales se mantienen en `src/styles/`
- Firebase está configurado en `src/config/firebase.js`
- Los cursos se cargan desde localStorage y Firebase (si está disponible)

## 🚢 Despliegue

Después de ejecutar `npm run build`, sube el contenido de la carpeta `build/` a tu hosting.

Si usas GitHub Pages, puedes configurar el `homepage` en `package.json`:

```json
"homepage": "https://tu-usuario.github.io/Graykids-Academy"
```

Luego ejecuta:

```bash
npm run build
```

Y sube la carpeta `build/` a la rama `gh-pages` o usa GitHub Actions.

## 📚 Próximos Pasos

- [ ] Configurar React Router para navegación entre páginas
- [ ] Migrar las páginas restantes (Login, Cursos, etc.)
- [ ] Implementar autenticación con Firebase Auth
- [ ] Agregar tests unitarios
- [ ] Optimizar imágenes y assets
