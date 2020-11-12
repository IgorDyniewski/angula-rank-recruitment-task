import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

// Styles
import '../styles/globals.css'

// theme
import theme from '../lib/theme'

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
