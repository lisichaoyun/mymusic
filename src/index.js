// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import 'core-js/es'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import reportWebVitals from './reportWebVitals'
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <>
    <App />
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
