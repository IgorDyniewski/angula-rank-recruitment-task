import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const IndexPage = () => {
    // Redirect to proper page
    const router = useRouter()
    useEffect(() => {
        router.push('/angular')
    }, [])

    return <></>
}

export default IndexPage
