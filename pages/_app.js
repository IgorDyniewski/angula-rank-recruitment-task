import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import NProgress from 'nprogress'
import Router from 'next/router'

// Styles
import '../styles/globals.css'
import '../styles/spinner.css'
import '../styles/nprogress.css'

// theme
import theme from '../lib/theme'

// Setting up an client side loader
Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`)
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
    NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <ThemeProvider theme={theme}>
                <Head>
                    <title>Angula Rank</title>
                </Head>
                <Component {...pageProps} />
            </ThemeProvider>
        )
    }
}
