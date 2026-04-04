import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
=======
import { AuthProvider } from './context/AuthContext'
>>>>>>> bb97d8c (full logic flow is working (hopefully))
import './index.css'
import App from './App.jsx'

// yahan se react app mount ho rahi hai 
// static mount point is 'root'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
        <App />
=======
      <AuthProvider>
        <App />
      </AuthProvider>
>>>>>>> bb97d8c (full logic flow is working (hopefully))
    </BrowserRouter>
  </StrictMode>,
)
