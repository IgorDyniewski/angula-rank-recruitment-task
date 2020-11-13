import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

// Components
import LoadingDataBanner from '../components/LoadingDataBanner'

// Styled components
const HeaderBackgroundWrapper = styled.div`
    width: 100vw;
    position: relative;
    background-image: url('/assets/top-bg.svg');
    background-size: 100%;
    background-position: 0px 0px;
    min-width: 1200px;
    position: fixed;
    top: 0px;
    left: 0px;
`
const HeaderBackground = styled.div`
    width: 100%;
    padding-top: ${(530 / 1920) * 100}%;
    position: relative;
`
const HeaderWrapper = styled.div`
    width: 100vw;
    height: 80px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`
const HeaderLogo = styled.div`
    height: 100%;
    width: 160px;
    background-image: url('/assets/logo.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
const TopFixedContentWrapper = styled.div`
    width: 100%;
    position: fixed;
    top: 80px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const TopFixedContent = styled.div`
    width: calc(100vw - 40px);
    max-width: 690px;
`

const OrganizationPage = (props) => {
    // Getting name of organization
    const router = useRouter()
    const { organizationName } = router.query

    // States
    const [isDataFetched, setIsDataFetched] = useState(false)

    return (
        <>
            {/* Top background */}
            <HeaderBackgroundWrapper>
                <HeaderBackground />
            </HeaderBackgroundWrapper>

            {/* Header with Logo */}
            <HeaderWrapper>
                <HeaderLogo />
            </HeaderWrapper>

            {/* Top fixed content */}
            <TopFixedContentWrapper>
                <TopFixedContent>
                    {!isDataFetched && <LoadingDataBanner loadingText={'Hold tight! We are cooking up data for you'} />}
                </TopFixedContent>
            </TopFixedContentWrapper>
        </>
    )
}

export default OrganizationPage
