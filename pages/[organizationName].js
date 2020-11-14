import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

// Components
import LoadingDataBanner from '../components/LoadingDataBanner'
import UserProfileBar from '../components/UserProfileBar'
import { TitleWrapper, Title, SubTitle, Button } from '../components/Elements'

// Styled components
const HeaderBackgroundWrapper = styled.div`
    width: 100vw;
    position: relative;
    background-image: url('/assets/top-bg.svg');
    background-size: 100%;
    background-position: 0px 0px;
    min-width: 1700px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: -1;
`
const HeaderBackground = styled.div`
    width: 100%;
    padding-top: ${(530 / 1920) * 100}%;
    position: relative;
`
const HeaderWrapper = styled.div`
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    height: 240px;
    padding-bottom: 7px;
    box-sizing: border-box;
    z-index: 2;
    background-color: ${(props) => props.theme.colors.githubGray};
`
const LogoWrapper = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const HeaderLogo = styled.div`
    height: 80%;
    width: 160px;
    background-image: url('/assets/logo.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
const TopFixedContent = styled.div`
    width: calc(100vw - 40px);
    max-width: 690px;
    height: calc(100% - 80px);
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
`
const ScrollContentWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 0;
`
const ScrollContent = styled.div`
    width: calc(100% - 40px);
    max-width: 690px;
`
const PseudoListElement = styled.div`
    height: 330px;
`
const LoadedTopFixedContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 20px;
`

const OrganizationPage = (props) => {
    // Getting name of organization
    const router = useRouter()
    const { organizationName } = router.query

    // States
    const [isDataFetched, setIsDataFetched] = useState(true)
    const [contributors, setContributors] = useState([])

    // Fetching organization contributors to all organization's repositories
    const _fetchOrganizationContributors = async (organizationName) => {
        // Spinning that loader
        setIsDataFetched(false)

        // Fetching contributors
        const res = await fetch(`api/get-all-organization-contributors/${organizationName}`)
        let response
        if (res.ok) {
            response = await res.json()
        } else {
            return alert('Error occurred while data fetching')
        }

        // We should have all contributors
        setContributors(response.allContributors)
        setIsDataFetched(true)
    }

    // Fetching / Re-fetching on organization name change
    useEffect(async () => {
        if (!organizationName) return // Checking if router knows org name
        // _fetchOrganizationContributors(organizationName)
    }, [organizationName])

    return (
        <>
            {/* Top background */}
            <HeaderBackgroundWrapper>
                <HeaderBackground />
            </HeaderBackgroundWrapper>

            {/* Header with Logo */}
            <HeaderWrapper>
                <LogoWrapper>
                    <HeaderLogo />
                </LogoWrapper>

                {/* Top fixed content */}
                <TopFixedContent>
                    {/* Rendering spinner when data is loading  */}
                    {!isDataFetched && <LoadingDataBanner loadingText={'Hold tight! We are cooking up data for you'} />}

                    {/* Rendering title and buttons when data is loaded */}
                    {isDataFetched && (
                        <LoadedTopFixedContentWrapper>
                            <TitleWrapper>
                                <Title>Contributors</Title>
                                <SubTitle>
                                    Browse all contributors from <b>github.com/{organizationName}</b>
                                </SubTitle>
                            </TitleWrapper>
                            <Button>Sort by:</Button>
                        </LoadedTopFixedContentWrapper>
                    )}
                </TopFixedContent>
            </HeaderWrapper>

            {/* Scroll content */}
            <ScrollContentWrapper>
                <ScrollContent>
                    <PseudoListElement />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                    <UserProfileBar />
                </ScrollContent>
            </ScrollContentWrapper>
        </>
    )
}

export default OrganizationPage
