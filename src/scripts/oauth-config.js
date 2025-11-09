// ========================================
// CONFIGURACIÓN DE OAUTH
// ========================================
// ⚠️ IMPORTANTE: Reemplaza YOUR_GOOGLE_CLIENT_ID con tu Client ID real de Google Cloud Console
// Obtén tu Client ID en: https://console.cloud.google.com/apis/credentials

const OAUTH_CONFIG = {
    google: {
        // ⚠️ IMPORTANTE: Si tienes el Client ID completo, reemplázalo aquí
        // Formato: 104975106598681893735-xxxxx.apps.googleusercontent.com
        // Si solo tienes el ID único, necesitarás crear un OAuth 2.0 Client ID en Google Cloud Console
        clientId: '545857776481-i7qtestirno9gevfeov7kiniov7qrbtc.apps.googleusercontent.com',
        // Cuenta de servicio asociada: graykids-academy@poetic-chariot-399320.iam.gserviceaccount.com
        // Para desarrollo local, usa: http://localhost:5500 o el puerto que uses
        // Para producción, usa: https://tudominio.com
        redirectUri: window.location.origin + '/oauth-callback.html',
        scope: 'openid email profile',
        responseType: 'code',
        accessType: 'online'
    }
};

// Función para obtener URL de autenticación de Google
function getGoogleAuthUrl() {
    const config = OAUTH_CONFIG.google;
    
    // Validar que el Client ID tenga el formato correcto
    if (!config.clientId || 
        config.clientId === 'YOUR_GOOGLE_CLIENT_ID' || 
        !config.clientId.includes('.apps.googleusercontent.com')) {
        console.error('⚠️ Client ID no configurado correctamente. Formato requerido: XXXXXXXXX-XXXXXXXXXXXXXXXX.apps.googleusercontent.com');
        return null;
    }
    
    const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri, // Sin parámetros aquí - debe coincidir exactamente con Google Cloud Console
        response_type: config.responseType,
        scope: config.scope,
        access_type: config.accessType,
        prompt: 'select_account' // Para que siempre muestre la selección de cuenta
    });
    
    // Agregar provider como parámetro state (que Google permite)
    params.append('state', 'provider=google');
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// Función para verificar si el Client ID está configurado
function isGoogleOAuthConfigured() {
    const config = OAUTH_CONFIG.google;
    return config.clientId && 
           config.clientId !== 'YOUR_GOOGLE_CLIENT_ID' && 
           config.clientId.includes('.apps.googleusercontent.com');
}

