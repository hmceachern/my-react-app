import { createRoot } from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
  
  
)  