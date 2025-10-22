/**
 * Punto de entrada principal de la aplicación.
 * -------------------------------------------------
 * Se monta la app de React y se conecta el store global
 * usando el proveedor de Redux Toolkit.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
