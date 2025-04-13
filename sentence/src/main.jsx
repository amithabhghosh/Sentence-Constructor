import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashPage } from './Pages/DashPage.jsx'
import { QuestionsPage } from './Pages/QuestionsPage.jsx'

const router= createBrowserRouter([
  {path:"/",element:<DashPage/>},
  {path:"/question",element:<QuestionsPage/>}
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
 <App />
  </RouterProvider>
   

)
