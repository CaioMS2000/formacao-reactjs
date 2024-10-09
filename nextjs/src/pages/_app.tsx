import { globalStyles } from '@/styles/globals'
import { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    globalStyles()

    return (
        <>
            <Head>
                <title>Ignite Shop</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
