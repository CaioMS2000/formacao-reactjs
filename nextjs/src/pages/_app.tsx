import { globalStyles } from '@/styles/globals'
import { AppProps } from 'next/app'
import Head from 'next/head'
import logoImg from './assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Image from 'next/future/image'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Ignite Shop</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <Header>
                    <Image src={logoImg} alt="" />
                </Header>
                <Component {...pageProps} />
            </Container>
        </>
    )
}

export default MyApp
