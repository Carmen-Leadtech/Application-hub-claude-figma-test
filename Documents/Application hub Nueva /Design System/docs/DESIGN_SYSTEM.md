# CV UI Kit - Design System Documentation
Documentación completa del Design System para desarrollo de aplicaciones con Claude Code.
## 🎨 Color System
El sistema de colores usa **tokens semánticos** que mapean a valores específicos.
### Colores Disponibles
#### Background Colors
```
--color-background-brand       #006dcc (Azul primario)
--color-background-default     #ffffff (Blanco)
--color-background-weaker      #dee1e3 (Gris claro)
--color-background-weakest     #f3f5f6 (Gris más claro)
--color-background-strong      #8a8f93 (Gris oscuro)
--color-background-stronger    #626666 (Gris más oscuro)
--color-background-strongest   #272a2a (Negro casi puro)
```
#### Text Colors
```
--color-text-default           #272a2a (Negro - texto normal)
--color-text-inverted          #ffffff (Blanco - sobre fondos oscuros)
--color-text-brand             #006dcc (Azul - énfasis)
--color-text-secondary         #62666a (Gris - subtítulos)
--color-text-disabled          #b5b5ba (Gris claro - deshabilitado)
```
#### Status Colors
```
Error:   --color-text-system-error      #c23200 (Rojo)
Success: --color-text-system-success    #00693c (Verde)
Warning: --color-text-system-warning    #be5200 (Naranja)
Info:    --color-text-system-info       #00417a (Azul oscuro)
```
### Cómo Usar Colores
```jsx
// ✅ CORRECTO - Usa tokens
<div style={{ backgroundColor: 'var(--color-background-brand)' }}>
  <p style={{ color: 'var(--color-text-inverted)' }}>Texto</p>
</div>
// ❌ INCORRECTO - Hardcodeado
<div style={{ backgroundColor: '#006dcc' }}>
  <p style={{ color: '#ffffff' }}>Texto</p>
</div>
```
## 📝 Tipografía
### Font Families
- **Heading**: Roboto
- **Body**: Roboto
### Font Weights
- Regular: 400 (cuerpo de texto)
- Medium: 500 (énfasis)
- Bold: 700 (headings)
### Estilos Semánticos
```
--text-heading          Para títulos principales
--text-body            Para párrafos
--text-small-details   Para captions y detalles pequeños
```
### Ejemplos
```jsx
// Heading
<h1 style={{ 
  fontFamily: 'var(--font-family-heading)',
  fontWeight: 700
}}>