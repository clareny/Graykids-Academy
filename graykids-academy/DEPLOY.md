# 🚀 Guía de Despliegue a GitHub Pages

## 📦 Qué Subir a GitHub

### ✅ SÍ Subir (Todo el código fuente):
```
graykids-academy/
├── public/              ✅ Subir TODO
│   ├── images/         ✅
│   ├── index.html      ✅
│   └── ...
├── src/                ✅ Subir TODO
│   ├── components/     ✅
│   ├── hooks/          ✅
│   ├── config/         ✅
│   ├── styles/         ✅
│   ├── assets/         ✅
│   ├── App.js          ✅
│   └── index.js        ✅
├── package.json        ✅
├── package-lock.json   ✅
├── .gitignore          ✅
├── README.md           ✅
└── public/index.html   ✅
```

### ❌ NO Subir (Ya están en .gitignore):
- `node_modules/` ❌ (se instala con `npm install`)
- `build/` ❌ (se genera con `npm run build`)
- `.env.local` ❌ (variables de entorno)
- Archivos temporales ❌

## 🔧 Pasos para Subir a GitHub

### 1. Inicializar Git (si no lo has hecho)
```bash
cd graykids-academy
git init
```

### 2. Agregar todos los archivos
```bash
git add .
```

### 3. Hacer commit
```bash
git commit -m "Migración a React - Graykids Academy"
```

### 4. Conectar con tu repositorio
```bash
git remote add origin https://github.com/clareny/Graykids-Academy.git
git branch -M main
git push -u origin main
```

## 🌐 Configurar GitHub Pages

### Opción 1: GitHub Actions (Recomendado)

1. Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

2. En GitHub:
   - Ve a Settings → Pages
   - Source: GitHub Actions
   - Cada vez que hagas push, se desplegará automáticamente

### Opción 2: Manual (gh-pages branch)

1. Instala gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Agrega scripts en package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Despliega:
```bash
npm run deploy
```

## 📝 Notas Importantes

- El `.gitignore` ya está configurado correctamente
- NO subas `node_modules/` (es muy pesado)
- NO subas `build/` (se genera automáticamente)
- El `homepage` en package.json ya está configurado para GitHub Pages

## 🔍 Verificar

Después de desplegar, tu app estará en:
**https://clareny.github.io/Graykids-Academy**

