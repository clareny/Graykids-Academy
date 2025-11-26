# 🚀 Cómo Desplegar tu App React

Tienes **2 opciones** para desplegar tu app React a GitHub Pages:

---

## 📋 Opción 1: GitHub Actions (Automático) ⭐ RECOMENDADO

### ✅ Ventajas:
- Automático: cada vez que hagas `git push`, se despliega solo
- No necesitas instalar nada extra
- Más profesional

### Pasos:

1. **Sube tu código a GitHub:**
```bash
cd graykids-academy
git init
git add .
git commit -m "Migración a React"
git remote add origin https://github.com/clareny/Graykids-Academy.git
git branch -M main
git push -u origin main
```

2. **Configura GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - **Settings** → **Pages**
   - En **Source**, selecciona: **"GitHub Actions"**
   - Guarda

3. **¡Listo!** Cada vez que hagas `git push`, se desplegará automáticamente.

**Tu app estará en:** https://clareny.github.io/Graykids-Academy

---

## 📋 Opción 2: gh-pages (Manual)

### ✅ Ventajas:
- Control manual del despliegue
- Útil si quieres desplegar solo cuando tú quieras

### Pasos:

1. **Compilar y desplegar:**
```bash
cd graykids-academy
npm run deploy
```

2. **Espera unos minutos** y tu app estará en:
   https://clareny.github.io/Graykids-Academy

### ⚠️ Nota:
Con esta opción, necesitas hacer `npm run deploy` cada vez que quieras actualizar la página.

---

## 🔍 Verificar que funciona:

1. Ve a: https://clareny.github.io/Graykids-Academy
2. Deberías ver tu app funcionando

---

## 📝 Resumen Rápido:

### Para GitHub Actions (Automático):
```bash
git add .
git commit -m "Actualización"
git push
# Se despliega automáticamente
```

### Para gh-pages (Manual):
```bash
npm run deploy
# Espera unos minutos
```

---

## ❓ ¿Cuál usar?

- **GitHub Actions**: Si quieres que se actualice automáticamente
- **gh-pages**: Si prefieres controlar cuándo se despliega

**Recomendación:** Usa GitHub Actions, es más fácil y automático.

