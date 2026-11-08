import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import RouteAccessibility from './components/RouteAccessibility'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Không tìm thấy phần tử root')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <RouteAccessibility />
    </BrowserRouter>
  </StrictMode>,
)