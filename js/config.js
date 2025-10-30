// ========================================
// CONFIGURACIÓN DE ADMINISTRADOR
// ========================================
// Cambia este email por TU email real
// Este será el email que tendrá acceso de administrador
const ADMIN_CONFIG = {
    defaultAdminEmail: 'spieronilton@gmail.com', // ⚠️ CAMBIA ESTO POR TU EMAIL
    defaultAdminPassword: 'admin123', // ⚠️ CAMBIA ESTA CONTRASEÑA (mínimo 8 caracteres, más segura)
    //admin@graykidsacademy.com ejemplo de email de administrador
};

// ========================================
// FUNCIONES DE ADMINISTRADOR
// ========================================

// Obtener lista de emails de administradores
function getAdminEmails() {
    return JSON.parse(localStorage.getItem('adminEmails') || '[]');
}

// Guardar lista de emails de administradores
function setAdminEmails(emails) {
    localStorage.setItem('adminEmails', JSON.stringify(emails));
}

// Verificar si un email es administrador
function isAdminEmail(email) {
    if (!email) return false;
    
    const adminEmails = getAdminEmails();
    const emailLower = email.toLowerCase();
    
    // Si hay lista configurada, usar esa
    if (adminEmails.length > 0) {
        return adminEmails.some(adminEmail => adminEmail.toLowerCase() === emailLower);
    }
    
    // Si no hay lista, usar el email por defecto
    const defaultEmail = ADMIN_CONFIG.defaultAdminEmail.toLowerCase();
    
    // Si el usuario coincide con el default, inicializar la lista
    if (emailLower === defaultEmail && adminEmails.length === 0) {
        setAdminEmails([ADMIN_CONFIG.defaultAdminEmail]);
    }
    
    return emailLower === defaultEmail;
}

// Verificar si el usuario actual es administrador
function isCurrentUserAdmin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!isLoggedIn || !user.email) {
        return false;
    }
    
    return isAdminEmail(user.email);
}

// Inicializar usuario administrador por defecto (si no existe)
function initializeAdminUser() {
    const adminEmail = ADMIN_CONFIG.defaultAdminEmail.toLowerCase().trim();
    const adminPassword = ADMIN_CONFIG.defaultAdminPassword;
    
    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    // Normalizar todas las claves existentes (para compatibilidad)
    const normalizedUsers = {};
    Object.keys(users).forEach(key => {
        normalizedUsers[key.toLowerCase().trim()] = users[key];
    });
    
    // Si el admin no existe en usuarios, crearlo automáticamente
    // También actualizar la contraseña si existe pero es diferente
    if (!normalizedUsers[adminEmail]) {
        normalizedUsers[adminEmail] = {
            name: adminEmail.split('@')[0],
            email: adminEmail,
            password: adminPassword // ⚠️ En producción NUNCA guardes contraseñas sin encriptar
        };
        console.log('✅ Usuario administrador creado automáticamente');
    } else if (normalizedUsers[adminEmail].password !== adminPassword) {
        // Actualizar contraseña si cambió en config.js
        normalizedUsers[adminEmail].password = adminPassword;
        console.log('✅ Contraseña de administrador actualizada');
    }
    
    // Guardar usuarios normalizados
    localStorage.setItem('users', JSON.stringify(normalizedUsers));
    
    // También guardar en la lista de adminEmails
    const adminEmails = getAdminEmails();
    if (!adminEmails.some(e => e.toLowerCase().trim() === adminEmail)) {
        adminEmails.push(ADMIN_CONFIG.defaultAdminEmail); // Guardar formato original
        setAdminEmails(adminEmails);
    }
    
    console.log('✅ Usuario administrador verificado/actualizado');
}

// Ejecutar inicialización al cargar el script
if (typeof window !== 'undefined') {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAdminUser);
    } else {
        initializeAdminUser();
    }
}

