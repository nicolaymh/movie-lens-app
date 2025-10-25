# 🎨 Gestión del Tema con Redux - Guía Completa

Esta guía explica cómo funciona el sistema de tema (claro/oscuro) usando Redux y las mejores prácticas de React.

---

## 📚 ¿Por qué `darkMode: 'class'` en Tailwind?

### Tailwind Config

```js
// tailwind.config.js
export default {
  darkMode: 'class',  // ← IMPORTANTE
  // ...
}
```

### ¿Qué hace `darkMode: 'class'`?

Le dice a Tailwind que **active las variantes `dark:`** solo cuando el elemento `<html>` tenga la clase `dark`:

```html
<!-- ❌ Modo Claro - SIN clase 'dark' -->
<html class="">
  <div class="bg-white dark:bg-gray-900">
    <!-- bg-white se aplica ✅ -->
    <!-- dark:bg-gray-900 NO se aplica -->
  </div>
</html>

<!-- ✅ Modo Oscuro - CON clase 'dark' -->
<html class="dark">
  <div class="bg-white dark:bg-gray-900">
    <!-- bg-white NO se aplica -->
    <!-- dark:bg-gray-900 se aplica ✅ -->
  </div>
</html>
```

### Alternativa: `darkMode: 'media'`

```js
darkMode: 'media'  // Usa prefers-color-scheme del SO
```

**Problema:** No podemos controlarlo desde la app. Depende 100% del sistema operativo.

---

## 🏗️ Arquitectura de la Solución con Redux

### Flujo de datos:

```
┌─────────────────────────────────────────────────────────┐
│  1. Usuario hace clic en botón "Modo Oscuro"           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  2. Componente dispatch(toggleTheme())                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  3. Redux actualiza state.theme.mode                    │
│     { mode: 'light' } → { mode: 'dark' }                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  4. Middleware detecta cambio en 'theme/'               │
└────────────────────┬────────────────────────────────────┘
                     │
           ┌─────────┴─────────┐
           │                   │
           ▼                   ▼
┌──────────────────┐  ┌───────────────────┐
│ 5a. Actualiza    │  │ 5b. Guarda en     │
│ <html class="">  │  │ localStorage      │
└──────────────────┘  └───────────────────┘
           │                   │
           └─────────┬─────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  6. Tailwind aplica estilos dark: automáticamente       │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Archivos Involucrados

### 1. **themeSlice.ts** - Estado de Redux

```typescript
// src/app/themeSlice.ts

interface ThemeState {
  mode: 'light' | 'dark'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.mode = action.payload
    },
  },
})
```

**Responsabilidades:**
- ✅ Define el estado del tema
- ✅ Provee acciones para cambiar el tema
- ✅ Lee el tema inicial desde localStorage o sistema

---

### 2. **themeMiddleware.ts** - Sincronización

```typescript
// src/app/themeMiddleware.ts

export const themeMiddleware = (store) => (next) => (action) => {
  const result = next(action)

  if (action.type?.startsWith('theme/')) {
    const theme = store.getState().theme.mode

    // Actualizar DOM
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Persistir en localStorage
    localStorage.setItem('theme', theme)
  }

  return result
}
```

**Responsabilidades:**
- ✅ Escucha cambios en Redux
- ✅ Actualiza la clase `dark` en `<html>`
- ✅ Guarda en localStorage

---

### 3. **store.ts** - Configuración del Store

```typescript
// src/app/store.ts

export const store = configureStore({
  reducer: {
    theme: themeReducer,           // ← Reducer del tema
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      moviesApi.middleware,
      themeMiddleware              // ← Middleware del tema
    ),
})
```

**Responsabilidades:**
- ✅ Registra el reducer del tema
- ✅ Registra el middleware del tema

---

### 4. **useTheme.ts** - Hook personalizado

```typescript
// src/hooks/useTheme.ts

export function useTheme() {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const isDark = theme === 'dark'

  // Aplicar tema inicial al montar
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    dispatch(toggleThemeAction())
  }

  return { isDark, toggleTheme, theme }
}
```

**Responsabilidades:**
- ✅ Provee interfaz simple para componentes
- ✅ Encapsula lógica de Redux
- ✅ Aplica tema inicial al cargar la app

---

## 🎯 Uso en Componentes

### Ejemplo 1: Botón de Toggle

```tsx
// src/components/layout/Header.tsx

import { useTheme } from '../../hooks/useTheme'

export function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  )
}
```

### Ejemplo 2: Componente que lee el tema

```tsx
// src/components/SomeComponent.tsx

import { useTheme } from '../hooks/useTheme'

export function SomeComponent() {
  const { theme } = useTheme()

  return (
    <div className={theme === 'dark' ? 'text-white' : 'text-black'}>
      Tema actual: {theme}
    </div>
  )
}
```

### Ejemplo 3: Usar Tailwind (Recomendado)

```tsx
// Mejor: Usar clases de Tailwind
export function SomeComponent() {
  return (
    <div className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
      Este componente se adapta automáticamente al tema
    </div>
  )
}
```

---

## ✅ Ventajas de esta Implementación

### 1. **Estado Centralizado**
```
❌ Antes: Estado local en cada componente
✅ Ahora: Una única fuente de verdad en Redux
```

### 2. **Sincronización Automática**
```
✅ DOM actualizado automáticamente
✅ localStorage sincronizado
✅ Todos los componentes reaccionan al cambio
```

### 3. **Persistencia**
```
✅ El tema se guarda en localStorage
✅ Se restaura al recargar la página
✅ Respeta preferencia del sistema operativo
```

### 4. **Separation of Concerns**
```
themeSlice.ts      → Lógica de estado
themeMiddleware.ts → Efectos secundarios (DOM, storage)
useTheme.ts        → Interfaz para componentes
```

### 5. **Testeable**
```typescript
// Fácil de testear
it('should toggle theme', () => {
  const state = themeReducer({ mode: 'light' }, toggleTheme())
  expect(state.mode).toBe('dark')
})
```

---

## 🔄 Comparación: Antes vs Ahora

### ❌ Implementación Anterior (useState)

```tsx
// ❌ Estado local - No centralizado
const [isDark, setIsDark] = useState(false)

// ❌ Cada componente tiene su propia lógica
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark)
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}, [isDark])

// ❌ Difícil de compartir entre componentes
```

**Problemas:**
- No está en Redux (inconsistente con el resto de la app)
- Difícil compartir el estado
- Lógica duplicada si varios componentes necesitan el tema

### ✅ Implementación Actual (Redux)

```tsx
// ✅ Estado global en Redux
const { isDark, toggleTheme } = useTheme()

// ✅ Middleware se encarga de todo
// ✅ Cualquier componente puede acceder fácilmente
```

**Beneficios:**
- Consistente con Redux (movies también usa Redux)
- Fácil de compartir
- Lógica centralizada

---

## 🎓 Conceptos Clave

### Redux Slice
Un "slice" es una porción del estado global de Redux:

```
Redux State
├── theme: { mode: 'dark' }        ← themeSlice
└── moviesApi: { ... }             ← moviesApi
```

### Middleware
Función que se ejecuta **entre** el dispatch y el reducer:

```
dispatch(action) → middleware → reducer → state
                       ↓
                  DOM, localStorage
```

### Selector
Función que extrae datos específicos del estado:

```typescript
const selectTheme = (state) => state.theme.mode
```

---

## 🚀 Próximos Pasos Sugeridos

1. **Persistencia avanzada**: Usar `redux-persist` para más robustez
2. **Más temas**: Agregar temas personalizados (azul, verde, etc.)
3. **Animaciones**: Transiciones suaves al cambiar de tema
4. **Testing**: Tests para el slice y middleware

---

## 📖 Recursos

- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Middleware](https://redux.js.org/understanding/history-and-design/middleware)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)

---

**¡Implementación completa con mejores prácticas de Redux! 🎉**
