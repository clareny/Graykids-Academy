import {
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
import { persistSession } from './auth-guard.js';
import { auth, db, firebaseConfigured } from './firebase-init.js';

const DEFAULT_BUTTON_HTML = '<a href="Login.html" class="btn btn--outline">Entrar</a>';

function getHeaderAuthContainer() {
    return document.getElementById('headerAuthButton');
}

function renderLoggedOut() {
    const container = getHeaderAuthContainer();
    if (!container) return;

    container.innerHTML = DEFAULT_BUTTON_HTML;
}

function renderLoggedIn(userInfo) {
    const container = getHeaderAuthContainer();
    if (!container) return;

    const displayName = userInfo?.name || 'Mi cuenta';

    container.innerHTML = `
        <div class="header__auth-actions">
            <a href="campus.html" class="btn btn--primary">Mi Campus</a>
            <button type="button" class="header__logout" data-action="signout" aria-label="Cerrar sesión">
                <span aria-hidden="true">⎋</span>
                <span>Cerrar sesión</span>
            </button>
        </div>
    `;

    const logoutBtn = container.querySelector('[data-action="signout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            logoutBtn.disabled = true;
            logoutBtn.style.opacity = '0.6';

            try {
                await signOut(auth);
                persistSession(null);
                renderLoggedOut();
            } catch (error) {
                console.error('Error cerrando sesión:', error);
                logoutBtn.disabled = false;
                logoutBtn.style.opacity = '';
            }
        });
    }

    const button = container.querySelector('.btn--primary');
    if (button) {
        button.setAttribute('aria-label', `Ir al campus de ${displayName}`);
    }
}

async function fetchUserData(user) {
    if (!firebaseConfigured || !db || !user) {
        return { isAdmin: false, role: 'student' };
    }

    try {
        const snapshot = await getDoc(doc(db, 'users', user.uid));
        if (snapshot.exists()) {
            return snapshot.data();
        }
    } catch (error) {
        console.error('Error obteniendo datos del usuario:', error);
    }

    return { isAdmin: false, role: 'student' };
}

function initializeSessionWatcher() {
    if (!firebaseConfigured || !auth) {
        renderLoggedOut();
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            persistSession(null);
            renderLoggedOut();
            return;
        }

        const data = await fetchUserData(user);
        const sessionInfo = persistSession(user, data) || {
            uid: user.uid,
            name: user.displayName || user.email?.split('@')[0] || 'Usuario',
            email: user.email,
            isAdmin: Boolean(data.isAdmin),
            role: data.role || (data.isAdmin ? 'admin' : 'student')
        };

        renderLoggedIn(sessionInfo);
    });
}

if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSessionWatcher);
    } else {
        initializeSessionWatcher();
    }
}

