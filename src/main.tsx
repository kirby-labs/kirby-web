import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './assets/styles/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

console.table(import.meta.env)

const root = createRoot(document.getElementById('root')!)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
