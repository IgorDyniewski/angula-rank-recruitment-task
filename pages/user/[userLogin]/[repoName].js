import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

// Components
import UserProfileBar from '../../../components/UserProfileBar'
import ListLoader from '../../../components/LongListLoader'
import {
    TitleWrapper,
    Title as TitleImport,
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
import Spinner from 'react-spinners/BarLoader'

// Styled components
const Title = styled(TitleImport)`
    font-size: 25px;
    margin-bottom: 10px;
`

const RepoPage = (props) => {
    // Getting name of organization
    const router = useRouter()
    const { userLogin, repoName, sortType } = router.query

    // Getting repo data
    const { repoData } = props

    // States
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [displayedData, setDisplayedData] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const _changeSortType = (type) => {
        console.log(router.pathname)
        router
            .push({ pathname: router.pathname, query: { userLogin: userLogin, repoName: repoName, sortType: type } })
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

    // Setting sort function
    const _sortFunction = (a, b) => {
        if (sortType === 'contributions') {
            return b.contributions - a.contributions
        } else if (sortType === 'repos') {
            return b.public_repos - a.public_repos
        } else if (sortType === 'gists') {
            return b.public_gists - a.public_gists
        } else if (sortType === 'followers') {
            return b.followers - a.followers
        } else {
            return 0
        }
    }

    // Initial fetch
    useEffect(async () => {
        setIsDataFetched(false)
        await _fetchContributors()
        setIsDataFetched(true)
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

                        {/* Putting loader when list is not ready */}
                        {!isDataFetched && <ListLoader />}

                        {/* Rendering list */}
                        {displayedData.sort(_sortFunction).map((contributor, index) => (
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
