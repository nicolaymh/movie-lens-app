# 🎬 MovieLens

Una aplicación web moderna para explorar películas populares, construida con React, TypeScript, Redux Toolkit y TailwindCSS.

## 📋 Tabla de Contenidos

- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [APIs Utilizadas](#-apis-utilizadas)
- [Componentes Principales](#-componentes-principales)
- [Estado Global](#-estado-global)
- [Animaciones](#-animaciones)
- [Carrusel](#-carrusel)
- [Modo Oscuro](#-modo-oscuro)
- [Deployment](#-deployment)

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- API Key de TMDB (gratuita)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd movie-lens
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   echo "VITE_TMDB_API_KEY=tu_api_key_aqui" > .env
   ```

4. **Obtener API Key de TMDB**
   - Visita [TMDB API](https://www.themoviedb.org/settings/api)
   - Crea una cuenta gratuita
   - Genera tu API Key
   - Reemplaza `tu_api_key_aqui` en el archivo `.env`

5. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de la build
npm run lint     # Linter de código
```

## 🏗️ Arquitectura del Proyecto

```
movie-lens/
├── public/                 # Archivos estáticos
├── src/
│   ├── api/               # 🌐 Servicios de API
│   │   └── moviesApi.ts   # RTK Query endpoints
│   ├── app/               # 🏪 Configuración Redux
│   │   └── store.ts       # Store principal
│   ├── components/        # 🧩 Componentes reutilizables
│   │   ├── Layout.tsx     # Layout principal
│   │   ├── Header.tsx     # Header con navegación
│   │   └── FeaturedCarousel.tsx # Carrusel de películas
│   ├── pages/             # 📄 Páginas/Vistas
│   │   ├── Home.tsx       # Listado de películas
│   │   └── MovieDetail.tsx # Detalle de película
│   ├── App.tsx            # Componente raíz
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── .env                   # Variables de entorno
├── .gitignore            # Archivos ignorados por Git
├── eslint.config.js      # Configuración ESLint
├── index.html            # HTML principal
├── package.json          # Dependencias del proyecto
├── package-lock.json     # Lock file de npm
├── README.md             # Documentación del proyecto
├── tailwind.config.js    # Configuración TailwindCSS
├── tsconfig.json         # Configuración TypeScript
├── tsconfig.app.json     # Configuración TS para app
├── tsconfig.node.json    # Configuración TS para Node
└── vite.config.ts        # Configuración Vite
```

### Explicación de la Estructura

- **`/api`**: Contiene los servicios de API usando RTK Query
- **`/app`**: Configuración del store de Redux
- **`/components`**: Componentes reutilizables y de UI
- **`/pages`**: Páginas principales de la aplicación
- **`/public`**: Archivos estáticos (imágenes, iconos, etc.)
- **Archivos de configuración**: ESLint, TypeScript, TailwindCSS, Vite

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 19.1.1** - Biblioteca principal para UI
- **TypeScript 5.9.3** - Tipado estático para mayor robustez
- **Vite 7.1.7** - Build tool rápido y moderno

### Estado y Datos
- **Redux Toolkit 2.9.1** - Manejo de estado global
- **RTK Query** - Cache y sincronización de datos de API
- **React Redux 9.2.0** - Conexión React-Redux

### Estilos y UI
- **TailwindCSS 4.1.15** - Framework de utilidades CSS
- **Framer Motion 12.23.24** - Animaciones fluidas
- **Swiper 12.0.3** - Carrusel interactivo

### Navegación
- **React Router DOM 7.9.4** - Enrutamiento de la aplicación

### Motivos de Elección

| Tecnología | Razón de Elección |
|------------|-------------------|
| **React + TypeScript** | Ecosistema maduro, excelente DX, type safety |
| **Redux Toolkit** | Estado predecible, DevTools, menos boilerplate |
| **RTK Query** | Cache automático, loading states, re-fetching |
| **TailwindCSS** | Desarrollo rápido, responsive, consistencia |
| **Vite** | Build rápido, HMR excelente, configuración mínima |
| **Framer Motion** | Animaciones declarativas, performance optimizada |
| **Swiper** | Carrusel robusto, touch-friendly, customizable |

## 🌐 APIs Utilizadas

### The Movie Database (TMDB)

**Base URL**: `https://api.themoviedb.org/3`

#### Endpoints Implementados

1. **Películas Populares**
   ```
   GET /movie/popular?language=es-ES&page={page}
   ```
   - Obtiene lista de películas populares
   - Soporte para paginación
   - Idioma en español

2. **Detalle de Película**
   ```
   GET /movie/{id}?language=es-ES
   ```
   - Información completa de una película
   - Géneros, cast, sinopsis, etc.

#### Configuración

```typescript
// src/api/moviesApi.ts
const BASE_URL = 'https://api.themoviedb.org/3'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY
      headers.set('Authorization', `Bearer ${apiKey}`)
      headers.set('accept', 'application/json')
      return headers
    },
  }),
  // ... endpoints
})
```

## 🧩 Componentes Principales

### Layout.tsx
**Propósito**: Layout principal que envuelve todas las páginas
**Funcionalidades**:
- Header con navegación
- Gestión de tema (claro/oscuro)
- Footer
- Responsive design

### Header.tsx
**Propósito**: Barra de navegación superior
**Props**:
- `isDark: boolean` - Estado del modo oscuro
- `toggleTheme: () => void` - Función para cambiar tema
**Funcionalidades**:
- Logo de la aplicación
- Botón de cambio de tema
- Diseño responsive

### Home.tsx
**Propósito**: Página principal con listado de películas
**Funcionalidades**:
- Lista de películas populares
- Carrusel de películas destacadas
- Paginación
- Estados de carga y error
- Animaciones de entrada

### MovieDetail.tsx
**Propósito**: Página de detalle de película individual
**Funcionalidades**:
- Información completa de la película
- Imagen de alta resolución
- Géneros y calificación
- Botón de regreso

### FeaturedCarousel.tsx
**Propósito**: Carrusel horizontal de películas destacadas
**Funcionalidades**:
- Navegación con flechas
- Indicadores de página
- Autoplay opcional
- Responsive design

## 🏪 Estado Global

### Redux Store

```typescript
// src/app/store.ts
export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
})
```

### RTK Query Slices

#### moviesApi Slice
**Funcionalidades**:
- Cache automático de datos
- Loading states
- Error handling
- Re-fetching inteligente

```typescript
// Hooks generados automáticamente
const { data, isLoading, error } = useGetPopularMoviesQuery(1)
const { data: movie } = useGetMovieByIdQuery(movieId)
```

### Gestión de Estado

- **Cache**: RTK Query maneja automáticamente el cache
- **Loading**: Estados de carga por endpoint
- **Error**: Manejo centralizado de errores
- **Optimistic Updates**: Actualizaciones optimistas

## ✨ Animaciones

### Framer Motion

#### Animaciones de Entrada
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Retardo entre elementos
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}
```

#### Hover Effects
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
>
```

#### Transiciones de Página
```typescript
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 20 }}
  transition={{ duration: 0.3 }}
>
```

### CSS Transitions
- Transiciones suaves en cambio de tema
- Hover effects en botones
- Loading skeletons animados

## 🎠 Carrusel

### Swiper.js Configuración

```typescript
// src/components/FeaturedCarousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

<Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation={true}
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000 }}
  loop={true}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
```

### Características
- **Navegación**: Flechas laterales
- **Paginación**: Indicadores de página
- **Autoplay**: Reproducción automática
- **Responsive**: Adaptable a diferentes pantallas
- **Touch**: Soporte para gestos táctiles

## 🌙 Modo Oscuro

### Implementación

```typescript
// src/components/Header.tsx
const [isDark, setIsDark] = useState(false)

const toggleTheme = () => {
  const newTheme = !isDark
  setIsDark(newTheme)
  document.documentElement.classList.toggle('dark', newTheme)
  localStorage.setItem('theme', newTheme ? 'dark' : 'light')
}
```

### Persistencia
- **localStorage**: Guarda preferencia del usuario
- **Detección del sistema**: Respeta preferencia del OS
- **Aplicación automática**: Se aplica al cargar la página

### Clases TailwindCSS
```css
/* Modo claro */
bg-white text-gray-900

/* Modo oscuro */
dark:bg-gray-800 dark:text-white
```

### Configuración TailwindCSS
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Usa clase 'dark' en <html>
  // ...
}
```

## 🚀 Deployment

### Build para Producción

```bash
# Construir la aplicación
npm run build

# Vista previa de la build
npm run preview
```

### Variables de Entorno

**Desarrollo** (`.env`):
```
VITE_TMDB_API_KEY=tu_api_key_desarrollo
```

**Producción**:
```
VITE_TMDB_API_KEY=tu_api_key_produccion
```

### Plataformas de Deployment

#### Vercel (Recomendado)
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático en cada push

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Configurar variables de entorno

#### GitHub Pages
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Agregar script al package.json
"deploy": "gh-pages -d dist"

# Deploy
npm run build
npm run deploy
```

### Optimizaciones de Producción

- **Code Splitting**: Lazy loading de rutas
- **Tree Shaking**: Eliminación de código no usado
- **Minificación**: Código y assets optimizados
- **Compresión**: Gzip/Brotli para assets
- **CDN**: Imágenes optimizadas desde TMDB

### Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_TMDB_API_KEY` | API Key de TMDB | `abc123def456` |

## 📱 Características Responsive

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Responsive**: Adaptable a diferentes pantallas
- **Touch Friendly**: Optimizado para dispositivos táctiles

## 🔧 Scripts de Desarrollo

```bash
# Desarrollo
npm run dev

# Linting
npm run lint

# Build
npm run build

# Preview
npm run preview
```

## 📄 Licencia

Este proyecto es parte de una prueba técnica y está destinado únicamente para fines educativos y de evaluación.

---

**Desarrollado con ❤️ usando React, TypeScript y TailwindCSS**