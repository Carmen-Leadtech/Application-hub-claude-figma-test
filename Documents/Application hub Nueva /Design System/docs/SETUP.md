# Setup Rápido - CV UI Kit
## 📋 Requisitos
- Git
- Node.js 16+
- NPM
## 🚀 Instalación
### Opción 1: Clonar el repositorio
```bash
git clone https://github.com/tunombre/cv-ui-kit.git
cd cv-ui-kit
npm install
```
### Opción 2: En un proyecto existente
```bash
# Clonar en una subcarpeta
git clone https://github.com/tunombre/cv-ui-kit.git cv-ui-kit
# Copiar el claude.md a tu proyecto
cp cv-ui-kit/claude.md ./
# Copiar la carpeta design-system
cp -r cv-ui-kit/design-system ./
```
## 📖 Ver el Storybook
```bash
cd cv-ui-kit
npm install
npm run storybook
```
Se abrirá en: `http://localhost:6006`
## 🔍 Estructura del Proyecto
```
cv-ui-kit/
├── storybook/                 ← Componentes visuales
│   ├── .storybook/
│   ├── src/
│   └── package.json
│
├── design-system/             ← Tokens y metadata
│   ├── tokens/
│   │   ├── colors.json
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   ├── radius.json
│   │   └── shadows.json
│   ├── components/
│   │   ├── loaders.json
│   │   ├── cards.json
│   │   ├── components.json
│   │   ├── forms.json
│   │   ├── layout.json
│   │   └── score.json
│   └── README.md
│
├── docs/                      ← Documentación
│   ├── claude.md              ← GUÍA PRINCIPAL
│   ├── SETUP.md               ← Este archivo
│   └── DESIGN_SYSTEM.md
│
├── validators/                ← Scripts de validación
│   ├── component-validator.ts
│   ├── token-validator.ts
│   └── compliance-report.ts
│
└── examples/                  ← Ejemplos de uso
    ├── Button.example.tsx
    ├── Form.example.tsx
    └── README.md
```
## 🧪 Validar Compliance
```bash
npm run validate:components
npm run validate:tokens
npm run validate:compliance
```
## 📝 Próximos pasos
1. Lee el `claude.md` en la raíz
2. Abre el Storybook: `npm run storybook`
3. Copia los archivos necesarios a tu proyecto
4. Consulta ejemplos en `/examples`
¡Listo para usar el Design System! 🎉