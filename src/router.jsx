import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/charecter/:id',
    element: <Profile />,
  },
])

export default router
