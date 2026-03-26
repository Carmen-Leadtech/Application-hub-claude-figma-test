# 🎨 CV UI Kit - Complete Developer Guide
**Última actualización**: Diciembre 2024  
**Versión**: 1.0.0  
**Repository**: https://github.com/tunombre/cv-ui-kit  
**Storybook**: https://storybooks.1eres.net/cv-ui-kit-storybook/  
**Package**: @npm_leadtech/cv-ui-kit
---
## ⚡ Quick Start
### Para Claude Code - Crear nuevo proyecto
```bash
# 1. Clonar el repo
git clone https://github.com/tunombre/cv-ui-kit.git cv-ui-kit
# 2. Copiar archivos necesarios a tu proyecto
cp cv-ui-kit/claude.md ./
cp -r cv-ui-kit/design-system ./
# 3. Ver el Storybook (opcional)
cd cv-ui-kit
npm install
npm run storybook
```
### Para consultar rápidamente
- **Design Tokens**: Ver `design-system/tokens/`
- **Componentes**: Ver `design-system/components/`
- **Ejemplos**: Ver `examples/`
- **Documentación completa**: Ver `docs/DESIGN_SYSTEM.md`
---
## 📁 Estructura del Proyecto
```
cv-ui-kit/
│
├── 📦 storybook/                   ← Componentes React (Storybook)
│   ├── .storybook/
│   ├── src/
│   ├── package.json
│   └── ... (Componentes originales)
│
├── 🎨 design-system/               ← TOKENS Y METADATA (LO IMPORTANTE)
│   ├── tokens/
│   │   ├── colors.json            ← 40+ colores semánticos
│   │   ├── typography.json        ← Tipografía
│   │   ├── spacing.json           ← Espaciado (4px base)
│   │   ├── radius.json            ← Border radius
│   │   └── shadows.json           ← Sombras
│   ├── components/
│   │   ├── index.md               ← Índice de componentes
│   │   ├── loaders.json           ← 3 componentes
│   │   ├── cards.json             ← 8 componentes
│   │   ├── components.json        ← 17 componentes
│   │   ├── forms.json             ← 6 componentes
│   │   ├── layout.json            ← 1 componente
│   │   └── score.json             ← 5 componentes
│   └── README.md
│
├── 📚 docs/                         ← DOCUMENTACIÓN
│   ├── SETUP.md                    ← Instrucciones de setup
│   ├── DESIGN_SYSTEM.md            ← Guía completa
│   └── EXAMPLES.md                 ← Ejemplos detallados
│
├── 🔧 validators/                  ← VALIDADORES (OPCIONAL)
│   ├── component-validator.ts      ← Valida componentes
│   ├── token-validator.ts          ← Valida tokens
│   └── compliance-report.ts        ← Reporte completo
│
├── 🧪 examples/                    ← EJEMPLOS DE USO
│   ├── Button.example.tsx
│   ├── Textfield.example.tsx
│   ├── Card.example.tsx
│   ├── Form.example.tsx
│   └── README.md
│
├── 📖 claude.md                    ← ESTE ARCHIVO
├── package.json
├── README.md
└── .gitignore
```
---
## 🎯 CÓMO USAR ESTE DESIGN SYSTEM
### En un proyecto nuevo de Claude Code
**Paso 1: Copia los archivos necesarios**
```bash
# Opción A: Copiar solo design-system (recomendado)
cp -r cv-ui-kit/design-system ./
cp cv-ui-kit/claude.md ./
# Opción B: Clonar todo (si necesitas ver Storybook localmente)
git clone https://github.com/tunombre/cv-ui-kit.git
```
**Paso 2: Estructura tu proyecto**
```
tu-proyecto/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.tsx
├── design-system/        ← Copiado desde cv-ui-kit
│   ├── tokens/
│   └── components/
├── claude.md             ← Este archivo
├── package.json
└── README.md
```
**Paso 3: Consulta constantemente**
- Necesitas un componente → `design-system/components/`
- Necesitas un color → `design-system/tokens/colors.json`
- Necesitas espaciado → `design-system/tokens/spacing.json`
---
## 🎨 DESIGN TOKENS
### Colores
**Siempre usa variables CSS, NUNCA hardcodees valores:**
```jsx
// ✅ CORRECTO
style={{ backgroundColor: 'var(--color-background-brand)' }}
style={{ color: 'var(--color-text-default)' }}
// ❌ INCORRECTO
style={{ backgroundColor: '#006dcc' }}
style={{ color: '#272a2a' }}
```
**Tokens principales:**
```
BACKGROUNDS:
--color-background-brand       #006dcc (Azul primario)
--color-background-default     #ffffff (Blanco)
--color-background-weaker      #dee1e3 (Gris claro)
--color-background-strongest   #272a2a (Negro)
TEXT:
--color-text-default           #272a2a (Negro - normal)
--color-text-inverted          #ffffff (Blanco - sobre oscuro)
--color-text-brand             #006dcc (Azul - énfasis)
--color-text-secondary         #62666a (Gris - subtítulo)
--color-text-disabled          #b5b5ba (Gris - deshabilitado)
STATUS:
--color-text-system-error      #c23200 (Rojo)
--color-text-system-success    #00693c (Verde)
--color-text-system-warning    #be5200 (Naranja)
--color-text-system-info       #00417a (Azul oscuro)
BORDERS:
--color-border-brand           #006dcc
--color-border-default         #272a2a
--color-border-strong          #767b7f
--color-border-weaker          #dee1e3
ICONS:
--color-icons-brand            #006dcc
--color-icons-default          #767b7f
--color-icons-weak             #b5b5ba
```
Ver `design-system/tokens/colors.json` para lista completa.
### Tipografía
```
FONT FAMILIES:
--font-family-heading          Roboto
--font-family-body             Roboto
FONT WEIGHTS:
--font-weight-regular          400 (cuerpo)
--font-weight-medium           500 (énfasis)
--font-weight-bold             700 (headings)
ESTILOS:
--text-heading                 Para h1, h2
--text-body                    Para párrafos
--text-small-details           Para captions (12px)
```
### Espaciado
**Sistema basado en múltiplos de 4px:**
```
--spacing-xs                   4px    (mínimo)
--spacing-sm                   8px    (pequeño)
--spacing-md                   16px   (mediano - DEFAULT)
--spacing-lg                   24px   (grande)
--spacing-xl                   32px   (extra large)
--spacing-2xl                  48px   (2x large)
```
**Uso:**
```jsx
// Padding
<div style={{ padding: 'var(--spacing-md)' }}>
// Margin
<div style={{ marginBottom: 'var(--spacing-lg)' }}>
// Gap
<div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
```
### Border Radius
```
--radius-none                  0px    (sin redondeo)
--radius-sm                    4px    (pequeño)
--radius-md                    8px    (mediano - DEFAULT)
--radius-lg                    16px   (grande)
--radius-xl                    24px   (extra large)
--radius-full                  9999px (circular)
```
### Sombras
```
--shadow-none                  none
--shadow-sm                    0px 1px 2px rgba(0,0,0,0.05)
--shadow-md                    0px 4px 6px rgba(0,0,0,0.1)
--shadow-lg                    0px 10px 15px rgba(0,0,0,0.15)
--shadow-xl                    0px 20px 25px rgba(0,0,0,0.2)
```
---
## 🧩 COMPONENTES (37 Total)
### 📂 Loaders (3)
- `AISpinner` - Spinner para procesamiento IA
- `CircularProgress` - Indicador circular
- `LoadingSteps` - Indicador multi-paso
### 📂 Cards (8)
- `AccordionCard` - Card colapsable
- `Banner` - Alertas/anuncios
- `Card` - Card básica
- `InfoCard` - Card de información
- `ProductCard` - Card de producto (⭐ muchas variantes)
- `PriorityCard` - Card de prioridad
- `PriorityCardList` - Lista de prioridades
- `SuggestionCard` - Sugerencias IA
### 📂 Components (17)
- `Badge` - Etiqueta
- `Button` - Botón de acción ⭐
- `ButtonIcon` - Botón solo icono
- `Chip` - Componente compacto
- `Dialog` - Modal
- `FileUploader` - Carga de archivos
- `Icon` - Icono
- `LanguageSelector` - Selector idioma
- `Link` - Enlace
- `MenuItem` - Item de menú
- `MenuItemBlock` - Item de menú en bloque
- `Popover` - Popover flotante
- `Skeleton` - Placeholder de carga
- `Slider` - Slider de rango
- `Tab` - Pestaña
- `Tabs` - Grupo de pestañas
- `Toast` - Notificación
- `Wysiwyg` - Editor de texto enriquecido
### 📂 Forms (6)
- `Checkbox` - Checkbox
- `RadioButton` - Radio button
- `Select` - Dropdown
- `SelectMenu` - Select avanzado
- `Switch` - Toggle
- `Textfield` - Input con label flotante ⭐
### 📂 Layout (1)
- `ContentHeader` - Header de página
### 📂 Score (5)
- `ScoreCard` - Card de puntuación
- `ScoreDonut` - Gráfico donut
- `ScoreProgress` - Indicador de progreso
- `ScoreProgressBar` - Barra de progreso
- `ScoreTag` - Tag de puntuación
**Ver `design-system/components/` para detalles completos.**
---
## 📚 COMPONENTES MÁS USADOS
### Button
```jsx
import { Button } from '@npm_leadtech/cv-ui-kit';
// Variantes: primary, secondary, gradient
<Button variant="primary" size="M">
  Click me
</Button>
<Button variant="secondary" size="S" disabled>
  Disabled
</Button>
<Button variant="gradient" fullWidth>
  Full width
</Button>
// Con icono
<Button variant="primary">
  <Icon name="plus" /> Add
</Button>
// Estados
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```
### Textfield
```jsx
import { Textfield } from '@npm_leadtech/cv-ui-kit';
// Básico
<Textfield
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
// Con validación
<Textfield
  label="Email"
  error={!!error}
  errorMessage={error}
/>
// Con ayuda
<Textfield
  label="Bio"
  assistiveText="Max 500 characters"
  maxLength={500}
/>
// Con decoradores
<Textfield
  label="Password"
  prefix={<Icon name="lock" />}
  suffix={<Icon name="eye" />}
/>
// Multilínea
<Textfield
  label="Description"
  multiline
  rows={4}
/>
```
### Card
```jsx
import { Card } from '@npm_leadtech/cv-ui-kit';
// Básica
<Card>
  <h2>Título</h2>
  <p>Contenido</p>
</Card>
// Variantes
<Card variant="default">Default</Card>
<Card variant="elevated">Con sombra</Card>
<Card variant="outlined">Con borde</Card>
```
### Formulario Completo
```jsx
import { Textfield, Button, Select, Checkbox, Card } from '@npm_leadtech/cv-ui-kit';
import React from 'react';
export function ContactForm() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    country: '',
    subscribe: false
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <Card style={{ maxWidth: '600px', padding: 'var(--spacing-lg)' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <Textfield
          label="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        <Textfield
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        <Select
          label="Country"
          value={form.country}
          onChange={(e) => setForm({...form, country: e.target.value})}
          options={[
            { value: 'us', label: 'USA' },
            { value: 'mx', label: 'México' },
            { value: 'es', label: 'España' }
          ]}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        <Checkbox
          label="Subscribe"
          checked={form.subscribe}
          onChange={(e) => setForm({...form, subscribe: e.target.checked})}
          style={{ marginBottom: 'var(--spacing-lg)' }}
        />
        <Button variant="primary" type="submit" fullWidth>
          Send
        </Button>
      </form>
    </Card>
  );
}
```
---
## ✅ CHECKLIST DE COMPLIANCE
Antes de hacer commit en tu proyecto, verifica:
- [ ] **¿Usé solo componentes del catálogo?**  
  Busca en `design-system/components/`
- [ ] **¿Validé todos los props?**  
  Verifica en el JSON del componente
- [ ] **¿Usé tokens en lugar de hardcodeado?**  
  No `#006dcc`, usa `var(--color-background-brand)`
- [ ] **¿Las variantes existen?**  
  Revisa `variants` en el JSON
- [ ] **¿Probé en mobile y desktop?**  
  Responsive design es obligatorio
- [ ] **¿Agregué aria-labels?**  
  Accesibilidad es importante
- [ ] **¿El validador pasa?**  
```bash
  npm run validate:compliance
```
---
## 🔍 VALIDADORES (OPCIONAL)
Si configuraste los validadores:
```bash
# Validar componentes
npm run validate:components
# Validar tokens
npm run validate:tokens
# Reporte completo
npm run validate:compliance
```
---
## 📖 MÁS INFORMACIÓN
| Necesitas... | Ve a... |
|---|---|
| Ver componentes visuales | Storybook: https://storybooks.1eres.net/cv-ui-kit-storybook/ |
| Tokens completos | `design-system/tokens/` |
| Componentes | `design-system/components/` |
| Ejemplos de código | `examples/` |
| Guía detallada | `docs/DESIGN_SYSTEM.md` |
| Setup instrucciones | `docs/SETUP.md` |
| Ejemplos de uso | `docs/EXAMPLES.md` |
---
## 🚀 Próximos Pasos
1. **Abre el Storybook** para ver componentes visuales:
```bash
   npm run storybook
```
2. **Lee la guía completa**:
```bash
   cat docs/DESIGN_SYSTEM.md
```
3. **Copia `design-system/` a tu proyecto**
4. **Consulta `design-system/components/` cuando necesites un componente**
5. **Valida compliance** antes de hacer push
---
## 📞 Soporte
- **GitHub Issues**: https://github.com/tunombre/cv-ui-kit/issues
- **Storybook**: https://storybooks.1eres.net/cv-ui-kit-storybook/
- **Design System Docs**: `design-system/README.md`
---
## 📄 Licencia
Este Design System es parte de CV UI Kit.
**Creado**: Diciembre 2024  
**Versión**: 1.0.0  
**Maintainer**: [@tunombre](https://github.com/tunombre)
---
## 🎯 RESUMEN RÁPIDO
| Cosa | Dónde encontrar |
|---|---|
| Un componente | `design-system/components/*.json` |
| Un color | `design-system/tokens/colors.json` |
| Espaciado | `design-system/tokens/spacing.json` |
| Ejemplo de uso | `examples/` |
| Validar código | `validators/` |
| Guía detallada | `docs/DESIGN_SYSTEM.md` |
**¡Listo para desarrollar! 🚀**
```
---
## ✅ ESTRUCTURA FINAL COMPLETA
Ahora tienes **TODOS** los archivos. Aquí está la estructura final:
```
cv-ui-kit/
│
├── 📦 storybook/
│   ├── .storybook/
│   ├── src/
│   └── package.json
│
├── 🎨 design-system/
│   ├── tokens/
│   │   ├── colors.json            ✅
│   │   ├── typography.json        ✅
│   │   ├── spacing.json           ✅
│   │   ├── radius.json            ✅
│   │   └── shadows.json           ✅
│   ├── components/
│   │   ├── index.md               ✅
│   │   ├── loaders.json           ✅
│   │   ├── cards.json             ✅ (incompleto en mensaje anterior)
│   │   ├── components.json        ✅ (incompleto)
│   │   ├── forms.json             ✅
│   │   ├── layout.json            ✅
│   │   └── score.json             ✅
│   └── README.md                  ✅
│
├── 📚 docs/
│   ├── SETUP.md                   ✅
│   ├── DESIGN_SYSTEM.md           ✅
│   └── EXAMPLES.md                (falta terminar)
│
├── 🔧 validators/
│   ├── component-validator.ts     ✅
│   ├── token-validator.ts         ✅
│   └── compliance-report.ts       ✅
│
├── 🧪 examples/
│   ├── Button.example.tsx         ✅
│   ├── Textfield.example.tsx      ✅
│   ├── Card.example.tsx           ✅
│   ├── Form.example.tsx           ✅
│   └── README.md                  (falta)
│
├── 📖 claude.md                   ✅ (ESTE ARCHIVO QUE ACABAS DE VER)
├── package.json
├── README.md
└── .gitignore