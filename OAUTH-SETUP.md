# Configuración de OAuth2 - Google y Facebook

Esta guía te ayudará a configurar el login social con Google y Facebook para tu sitio web.

## 🔐 Google OAuth2

### 1. Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Credentials**

### 2. Configurar la pantalla de consentimiento

1. Ve a **OAuth consent screen**
2. Selecciona **External** (para usuarios externos)
3. Completa la información requerida:
   - App name: Graykids Academy
   - User support email: tu@email.com
   - Developer contact: tu@email.com

### 3. Crear OAuth 2.0 Client ID

1. Ve a **Credentials** > **Create Credentials** > **OAuth client ID**
2. Application type: **Web application**
3. Name: Graykids Academy Web
4. **Authorized JavaScript origins**: 
   - `http://localhost:3000` (desarrollo)
   - `https://tudominio.com` (producción)
5. **Authorized redirect URIs**:
   - `http://localhost:3000/oauth-callback.html`
   - `https://tudominio.com/oauth-callback.html`

### 4. Obtener tus credenciales

Copia tu **Client ID** y reemplázalo en `Login.html`:

```javascript
const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    'client_id=TU_CLIENT_ID_AQUI&' +  // ← Reemplaza esto
    'redirect_uri=' + encodeURIComponent(window.location.origin + '/oauth-callback.html?provider=google') + '&' +
    // ...
```

## 📘 Facebook Login

### 1. Crear una App en Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Crea una nueva App
3. Selecciona **Consumer** como tipo de app

### 2. Configurar Facebook Login

1. Ve a **Facebook Login** > **Settings**
2. **Valid OAuth Redirect URIs**:
   - `http://localhost:3000/oauth-callback.html`
   - `https://tudominio.com/oauth-callback.html`

### 3. Obtener tu App ID

Copia tu **App ID** y reemplázalo en `Login.html`:

```javascript
const facebookAuthUrl = 'https://www.facebook.com/v18.0/dialog/oauth?' +
    'client_id=TU_APP_ID_AQUI&' +  // ← Reemplaza esto
    // ...
```

## 🔗 Página de Callback OAuth

Crear el archivo `oauth-callback.html` para manejar el redirect:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Autenticando...</title>
</head>
<body>
    <h1>Autenticando...</h1>
    <script>
        // Obtener el código de autorización
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const provider = urlParams.get('provider');
        
        // Enviar el código a tu backend
        fetch('/api/auth/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, provider })
        })
        .then(response => response.json())
        .then(data => {
            // Guardar tokens en localStorage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirigir al inicio
            window.location.href = 'index.html';
        });
    </script>
</body>
</html>
```

## 🚀 Backend (Backend)

Necesitarás un backend para:

1. **Intercambiar el código por tokens**
2. **Obtener información del usuario**
3. **Crear/actualizar cuenta en tu base de datos**

### Ejemplo con Node.js:

```javascript
// backend/api/auth/callback.js
const express = require('express');
const axios = require('axios');

app.post('/api/auth/callback', async (req, res) => {
    const { code, provider } = req.body;
    
    if (provider === 'google') {
        // Intercambiar código por token
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.GOOGLE_REDIRECT_URI
        });
        
        // Obtener info del usuario
        const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
        });
        
        const user = userResponse.data;
        
        // Crear/actualizar usuario en tu BD
        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
            dbUser = await User.create({
                name: user.name,
                email: user.email,
                picture: user.picture,
                provider: 'google'
            });
        }
        
        res.json({
            access_token: tokenResponse.data.access_token,
            user: {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.picture
            }
        });
    }
    
    // Similar para Facebook...
});
```

## ✅ Activar OAuth en Producción

1. **Descomentar** las líneas en `Login.html`:
```javascript
// Cambiar de:
// window.location.href = googleAuthUrl;

// A:
window.location.href = googleAuthUrl;
```

2. **Configurar variables de entorno** en tu servidor

3. **Probar el flujo completo**

## 🔒 Seguridad

- ✅ Nunca expongas tus secrets en el frontend
- ✅ Usa HTTPS en producción
- ✅ Valida los tokens en tu backend
- ✅ Implementa CSRF protection
- ✅ Maneja errores de autenticación

## 📚 Recursos

- [Google OAuth2 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Docs](https://developers.facebook.com/docs/facebook-login/)
- [OAuth 2.0 Flow](https://oauth.net/2/)

