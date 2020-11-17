import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// Components
import LoadingDataBanner from '../components/LoadingDataBanner'
import ErrorBanner from '../components/ErrorBanner'
import UserProfileBar from '../components/UserProfileBar'
import {
    TitleWrapper,
    Title,
    SubTitle,
    Button,
    Select,
    HeaderBackgroundWrapper,
    HeaderBackground,
    HeaderWrapper,
    LogoWrapper,
    HeaderLogo,
    TopFixedContent,
    ScrollContentWrapper,
    CenterWrapper,
    PseudoListElement,
    LoadedTopFixedContentWrapper,
} from '../components/Elements'
import InfiniteScroll from 'react-infinite-scroll-component'

const OrganizationPage = (props) => {
    // Getting name of organization
    const router = useRouter()
    const { organizationName, sortType } = router.query

    // States
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [contributors, setContributors] = useState([])
    const [isError, setIsError] = useState(false)
    const [displayedData, setDisplayedData] = useState([])

    const _changeSortType = (type) => {
        router
            .push({ pathname: router.pathname, query: { organizationName: organizationName, sortType: type } })
            .then(() => window.scrollTo(0, 0))
    }

    // Fetching organization contributors to all organization's repositories
    const _fetchOrganizationContributors = async (organizationName) => {
        // Spinning that loader
        setIsDataFetched(false)

        // Scrolling to top of a page
        window.scrollTo(0, 0)

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

        // Sorting contributors and updating data
        const _setInitialData = (data) => {
            setContributors(data)
            setDisplayedData(data.slice(0, 20))
            setIsDataFetched(true)
        }
        if (sortType === 'contributions') {
            _setInitialData(response.allContributors.sort((a, b) => b.contributions - a.contributions))
        } else if (sortType === 'repos') {
            _setInitialData(response.allContributors.sort((a, b) => b.public_repos - a.public_repos))
        } else if (sortType === 'gists') {
            _setInitialData(response.allContributors.sort((a, b) => b.public_gists - a.public_gists))
        } else if (sortType === 'followers') {
            _setInitialData(response.allContributors.sort((a, b) => b.followers - a.followers))
        } else {
            _setInitialData(response.allContributors)
        }
    }

    // Fetching / Re-fetching on organization name change
    useEffect(async () => {
        if (!organizationName) return // Checking if router knows org name
        _fetchOrganizationContributors(organizationName)
    }, [organizationName, sortType])

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
                            <Select value={sortType} onChange={(e) => _changeSortType(e.target.value)}>
                                <option value="none">Sort by: none</option>
                                <option value="contributions">Sort by: contributions</option>
                                <option value="followers">Sort by: followers</option>
                                <option value="repos">Sort by: repos</option>
                                <option value="gists">Sort by: gists</option>
                            </Select>
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
