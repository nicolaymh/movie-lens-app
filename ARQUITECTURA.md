# 📐 Arquitectura y Organización del Código

Este documento explica la nueva estructura del proyecto después del refactor completo.

## 🗂️ Estructura de Carpetas

```
src/
├── api/                        # Servicios de API (RTK Query)
│   └── moviesApi.ts
│
├── app/                        # Configuración del store de Redux
│   └── store.ts
│
├── components/
│   ├── ui/                     # Componentes reutilizables de UI
│   │   ├── Button.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── MovieCard.tsx
│   │
│   ├── features/               # Componentes específicos de features
│   │   ├── carousel/
│   │   │   └── FeaturedCarousel.tsx
│   │   └── movies/
│   │       ├── MovieGrid.tsx
│   │       └── Pagination.tsx
│   │
│   └── layout/                 # Componentes de layout
│       ├── Header.tsx
│       └── Layout.tsx
│
├── hooks/                      # Custom hooks
│   ├── useMovies.ts
│   └── useTheme.ts
│
├── pages/                      # Páginas principales
│   ├── Home.tsx
│   └── MovieDetail.tsx
│
├── types/                      # Tipos de TypeScript
│   └── movie.types.ts
│
├── utils/                      # Utilidades y helpers
│   ├── animations.ts
│   ├── constants.ts
│   └── imageUtils.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

## 📦 Descripción de Carpetas

### `/api`
Contiene los servicios de API usando RTK Query.
- **moviesApi.ts**: Endpoints para obtener películas populares y detalles

### `/components/ui`
Componentes de UI reutilizables y genéricos que pueden usarse en toda la aplicación.

- **Button.tsx**: Botón con variantes (primary, secondary, ghost)
- **ErrorMessage.tsx**: Mensaje de error centrado
- **LoadingSpinner.tsx**: Spinner de carga con tamaños configurables
- **MovieCard.tsx**: Tarjeta de película con animaciones

### `/components/features`
Componentes específicos de funcionalidades del negocio.

#### `/carousel`
- **FeaturedCarousel.tsx**: Carrusel de películas destacadas con Swiper

#### `/movies`
- **MovieGrid.tsx**: Grid de películas con animaciones staggered
- **Pagination.tsx**: Controles de paginación

### `/components/layout`
Componentes que definen la estructura general de la aplicación.

- **Header.tsx**: Barra de navegación con menú hamburguesa
- **Layout.tsx**: Layout principal con tema

### `/hooks`
Custom hooks que encapsulan lógica reutilizable.

- **useMovies.ts**: Manejo de películas con paginación
- **useTheme.ts**: Gestión del tema (claro/oscuro) con persistencia

### `/pages`
Páginas/vistas principales de la aplicación.

- **Home.tsx**: Página principal con listado de películas
- **MovieDetail.tsx**: Página de detalle de película

### `/types`
Definiciones de tipos TypeScript compartidos.

- **movie.types.ts**: Movie, Genre, MoviesResponse

### `/utils`
Funciones utilitarias y constantes.

- **animations.ts**: Variantes de Framer Motion centralizadas
- **constants.ts**: Constantes globales (URLs, configuraciones)
- **imageUtils.ts**: Funciones para URLs de imágenes

## 🎯 Principios de Organización

### 1. **Separación de Responsabilidades**
Cada componente tiene una única responsabilidad bien definida.

### 2. **Reutilización**
Los componentes UI son genéricos y pueden usarse en diferentes contextos.

### 3. **Colocación (Colocation)**
Los archivos relacionados están agrupados por feature/funcionalidad.

### 4. **DRY (Don't Repeat Yourself)**
La lógica duplicada se extrajo a:
- Custom hooks (useMovies, useTheme)
- Utilidades (imageUtils, animations)
- Constantes centralizadas

### 5. **Type Safety**
Todos los componentes usan TypeScript con tipos explícitos.

## 📝 Convenciones de Código

### Imports
```typescript
// Tipos se importan con "import type"
import type { Movie } from '../types/movie.types'

// Valores se importan normalmente
import { getPosterUrl } from '../utils/imageUtils'
```

### Nombres de Componentes
- **PascalCase**: `MovieCard`, `LoadingSpinner`
- Nombres descriptivos que indican su propósito

### Nombres de Archivos
- Componentes: `ComponentName.tsx`
- Hooks: `useHookName.ts`
- Utilidades: `utilityName.ts`
- Tipos: `name.types.ts`

### Estructura de Componentes
```typescript
/**
 * @file Descripción del componente
 */

// Imports
import { ... }

// Types/Interfaces
interface ComponentProps {
  ...
}

// Component
export function Component({ props }: ComponentProps) {
  // Hooks
  // Estados
  // Handlers
  // Render
}
```

## 🔄 Flujo de Datos

```
User Action
    ↓
Component (UI)
    ↓
Custom Hook (useMovies)
    ↓
RTK Query (moviesApi)
    ↓
API (TMDB)
    ↓
Redux Store
    ↓
Component (Re-render)
```

## 🎨 Ventajas del Refactor

### Antes
- ❌ Código duplicado (loading, error states)
- ❌ Componentes grandes (Home.tsx: 119 líneas)
- ❌ Constantes hardcodeadas
- ❌ Tipos `any` en TypeScript
- ❌ Lógica mezclada con UI

### Después
- ✅ Código reutilizable (LoadingSpinner, ErrorMessage)
- ✅ Componentes pequeños y enfocados (Home.tsx: 40 líneas)
- ✅ Constantes centralizadas
- ✅ Tipado completo y seguro
- ✅ Separación clara de lógica y UI

## 📚 Guía de Uso

### Crear un nuevo componente UI
1. Crear archivo en `/components/ui/`
2. Exportar función con tipo de props
3. Documentar con JSDoc
4. Agregar variantes si aplica

### Crear un nuevo hook
1. Crear archivo en `/hooks/`
2. Nombrar con prefijo `use`
3. Retornar objeto con valores y funciones
4. Documentar parámetros y retorno

### Agregar una nueva página
1. Crear archivo en `/pages/`
2. Usar hooks y componentes existentes
3. Agregar animaciones con variantes de `/utils/animations`
4. Actualizar rutas en `App.tsx`

## 🚀 Próximos Pasos Sugeridos

1. **Testing**: Agregar tests unitarios para componentes y hooks
2. **Storybook**: Documentar componentes UI con Storybook
3. **Error Boundaries**: Agregar manejo de errores a nivel de componente
4. **Lazy Loading**: Implementar lazy loading para imágenes
5. **Caché**: Mejorar estrategias de caché con RTK Query
6. **Accesibilidad**: Agregar ARIA labels y mejorar navegación con teclado

## 📖 Recursos Adicionales

- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
