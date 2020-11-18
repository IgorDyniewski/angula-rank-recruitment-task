import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// Components
import LoadingDataBanner from '../../../components/LoadingDataBanner'
import ErrorBanner from '../../../components/ErrorBanner'
import UserProfileBar from '../../../components/UserProfileBar'
import ListLoader from '../../../components/LongListLoader'
import {
    TitleWrapper,
    Title,
    SubTitle,
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
} from '../../../components/Elements'
import InfiniteScroll from 'react-infinite-scroll-component'

const RepoPage = (props) => {
    // Getting name of organization
    const router = useRouter()
    const { userLogin, repoName, sortType } = router.query

    // Getting repo data
    const { repoData } = props

    // States
    const [displayedData, setDisplayedData] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const _changeSortType = (type) => {
        router
            .push({ pathname: router.pathname, query: { organizationName: organizationName, sortType: type } })
            .then(() => window.scrollTo(0, 0))
    }

    // Loading more fields
    const _loadMoreFields = async () => {
        await _fetchContributors()
    }

    // Fetching contributors
    const _fetchContributors = async () => {
        let response = await fetch(`/api/repos/get-repo-contributors/${userLogin}/${repoName}?page=${page + 1}`)
        response = await response.json()

        if (response.contributors.length === 0) setHasMore(false)

        // Updating list
        setDisplayedData(displayedData.concat(response.contributors))
        setPage(page + 1)
    }

    // Initial fetch
    useEffect(() => {
        _fetchContributors()
    }, [userLogin, repoName, sortType])

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
                    {/* Rendering title and buttons when data is loaded */}
                    <LoadedTopFixedContentWrapper>
                        <TitleWrapper>
                            <Title>{repoData.full_name}</Title>
                            <SubTitle>
                                Browse all contributors from <b>github.com/{repoData.full_name}</b>
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
                </TopFixedContent>
            </HeaderWrapper>

            {/* Scroll content */}
            <CenterWrapper>
                <ScrollContentWrapper>
                    <InfiniteScroll
                        dataLength={displayedData.length}
                        next={_loadMoreFields}
                        hasMore={hasMore}
                        loader={hasMore && <ListLoader />}
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
                                followersCount={contributor.followers}
                            />
                        ))}
                    </InfiniteScroll>
                </ScrollContentWrapper>
            </CenterWrapper>
        </>
    )
}

// Getting data for page
RepoPage.getInitialProps = async (context) => {
    const { userLogin, repoName } = context.query

    let isRepoReqValid = true
    let repoData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/repos/${userLogin}/${repoName}`).catch((err) => {
        console.log(err)
        isRepoReqValid = false
        return { res: false }
    })
    if (!isRepoReqValid) return
    repoData = await repoData.json()

    return { res: true, repoData: repoData.repoData }
}

export default RepoPage
