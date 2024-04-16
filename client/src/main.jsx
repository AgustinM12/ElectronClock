import React from 'react'
import ReactDOM from 'react-dom/client'
import { Clock } from './Clock'
import { ClockStyleProvider } from './context/ClockStyle.context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClockStyleProvider>
      <Clock />
    </ClockStyleProvider>
  </React.StrictMode>,
)
