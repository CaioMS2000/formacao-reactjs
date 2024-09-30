import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'
import { queryCLient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

export function App() {
    return (
        <>
            <HelmetProvider>
                <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
                    <Helmet titleTemplate="%s | Pizza Shop" />
                    <Toaster richColors closeButton />
                    <QueryClientProvider client={queryCLient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </ThemeProvider>
            </HelmetProvider>
        </>
    )
}
