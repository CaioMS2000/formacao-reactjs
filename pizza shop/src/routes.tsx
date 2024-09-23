import { createBrowserRouter } from 'react-router-dom'
import { Dasboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Dasboard />,
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/sign-in',
            element: <SignIn />,
        }
        ]
    },
])
