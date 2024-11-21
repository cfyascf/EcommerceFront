import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './contexts/user.context'
import { GroupProvider } from './contexts/group.context'
import routes from './routes/main.routes'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <GroupProvider>
        <RouterProvider router={routes}/>
      </GroupProvider>
    </UserProvider>
  </StrictMode>,
)
