import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import 'antd/dist/reset.css'
import './assets/styles/index.css'

console.table(import.meta.env)

const root = createRoot(document.getElementById('root')!)
root.render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF651E',
          colorTextBase: '#242F57',
          colorBgBase: '#ffffff',
          borderRadius: 10,
          fontFamily: "'Red Hat Display', sans-serif",
          colorBorder: '#E8EBF2',
          colorBorderSecondary: '#E8EBF2',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
)
