import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

// Components
import LoadingDataBanner from '../components/LoadingDataBanner'
import ErrorBanner from '../components/ErrorBanner'
import UserProfileBar from '../components/UserProfileBar'
import { TitleWrapper, Title, SubTitle, Button } from '../components/Elements'
import InfiniteScroll from 'react-infinite-scroll-component'

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
    border-bottom: ${(props) => (props.isBorderVisible ? `2px solid ${props.theme.colors.lightGray}` : 'none')};
`
const ScrollContentWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    max-width: 690px;
    top: 0px;
    left: 0px;
    z-index: 0;
    padding-left: 10px;
    padding-right: 10px;
`
const CenterWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 0;
    padding-left: 10px;
    padding-right: 10px;
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
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [contributors, setContributors] = useState([])
    const [isError, setIsError] = useState(false)
    const [displayedData, setDisplayedData] = useState([])

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

        // Checking if data is correct(org exists)
        if (!response.res && response.err) {
            setIsDataFetched(true)
            setIsError(true)
            return
        }

        // We should have all contributors
        setContributors(response.allContributors)
        setDisplayedData(response.allContributors.slice(0, 20))
        setIsDataFetched(true)
    }

    // Fetching / Re-fetching on organization name change
    useEffect(async () => {
        if (!organizationName) return // Checking if router knows org name
        _fetchOrganizationContributors(organizationName)
    }, [organizationName])

    // Loading more fields
    const _loadMoreFields = () => {
        setDisplayedData(displayedData.concat(contributors.slice(displayedData.length, displayedData.length + 10)))
    }

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
                <TopFixedContent isBorderVisible={!isError}>
                    {/* Rendering spinner when data is loading  */}
                    {!isDataFetched && <LoadingDataBanner loadingText={'Hold tight! We are cooking up data for you'} />}

                    {/* Rendering error baner in case of error */}
                    {isDataFetched && isError && (
                        <ErrorBanner loadingText={'Whoops! We couldn’t find your organization.'} />
                    )}

                    {/* Rendering title and buttons when data is loaded */}
                    {isDataFetched && !isError && (
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
            <CenterWrapper>
                <ScrollContentWrapper>
                    {displayedData.length > 0 && (
                        <InfiniteScroll
                            dataLength={displayedData.length}
                            next={_loadMoreFields}
                            hasMore={displayedData.length < contributors.length}
                            loader={<h4>Loading...</h4>}
                        >
                            <PseudoListElement />
                            {displayedData.map((contributor, index) => (
                                <UserProfileBar
                                    key={index}
                                    profilePictureSrc={contributor.avatar_url}
                                    githubUrl={contributor.html_url}
                                    fullName={contributor.name}
                                    contributions={contributor.contributions}
                                    gitHubLogin={contributor.login}
                                    publicGists={contributor.public_gists}
                                    publicRepos={contributor.public_repos}
                                />
                            ))}
                        </InfiniteScroll>
                    )}
                </ScrollContentWrapper>
            </CenterWrapper>
        </>
    )
}

export default OrganizationPage
