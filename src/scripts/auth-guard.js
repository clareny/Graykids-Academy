import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
import { auth, db, firebaseConfigured } from './firebase-init.js';

export function persistSession(user, extra = {}) {
    if (!user) {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        document.cookie = 'user_session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        document.cookie = 'is_logged_in=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        return;
    }

    const providerId = user.providerData && user.providerData[0]?.providerId
        ? user.providerData[0].providerId
        : 'password';

    const userInfo = {
        uid: user.uid,
        name: extra.name || user.displayName || user.email.split('@')[0],
        email: user.email,
        provider: providerId,
        isAdmin: Boolean(extra.isAdmin),
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || '',
        role: extra.role || (extra.isAdmin ? 'admin' : 'student')
    };

    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('isLoggedIn', 'true');

    const cookieValue = encodeURIComponent(JSON.stringify(userInfo));
    const expires = new Date();
    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = `user_session=${cookieValue};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
    document.cookie = `is_logged_in=true;expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;

    return userInfo;
}

export function guardPage({
    requireAdmin = false,
    redirectIfNoAuth = 'Login.html',
    redirectIfNotAdmin = 'campus.html',
    onReady = () => {},
    onChecking = () => {}
} = {}) {
    if (!firebaseConfigured || !auth) {
        window.location.href = redirectIfNoAuth;
        return Promise.resolve(null);
    }

    onChecking();

    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();

            if (!user) {
                persistSession(null);
                window.location.href = redirectIfNoAuth;
                resolve(null);
                return;
            }

            let userData = { isAdmin: false, role: 'student' };

            if (db) {
                try {
                    const snapshot = await getDoc(doc(db, 'users', user.uid));
                    if (snapshot.exists()) {
                        userData = snapshot.data();
                    }
                } catch (error) {
                    console.error('Error obteniendo información de usuario:', error);
                }
            }

            const isAdmin = Boolean(userData.isAdmin);

            if (requireAdmin && !isAdmin) {
                window.location.href = redirectIfNotAdmin;
                resolve(null);
                return;
            }

            const sessionInfo = persistSession(user, userData);
            onReady(user, userData, sessionInfo);
            resolve({ user, data: userData, session: sessionInfo });
        });
    });
}



