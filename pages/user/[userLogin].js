import React, { useState } from 'react'
import styled from 'styled-components'

// Components
import { LogoWrapper, HeaderLogo } from '../../components/Elements'
import RepositoryTile from '../../components/RepositoryTile'
import InfiniteScroll from 'react-infinite-scroll-component'
import LongListLoader from '../../components/LongListLoader'

// Styled components
const MainHeader = styled.div`
    width: 100vw;
    height: 80px;
    background-color: ${(props) => props.theme.colors.githubGray};
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
`
const UserHeaderMain = styled.div`
    position: relative;
    margin-top: 80px;
    background-color: ${(props) => props.theme.colors.lightBg};
    width: 100%;
    display: flex;
    justify-content: center;
    border: 1px solid ${(props) => props.theme.colors.textSecondary};
`
const Content = styled.div`
    width: calc(100% - 30px);
    max-width: 1100px;
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: 570px) {
        flex-direction: column;
    }
`
const ProfilePicture = styled.div`
    width: 150px;
    height: 150px;
    min-width: 150px;
    min-height: 150px;
    border-radius: 150px;
    border: 6px solid ${(props) => props.theme.colors.blue};
    background-image: url('${(props) => props.src}');
    background-size: cover;
    background-position: center;
    @media (max-width: 730px) {
        width: 100px;
        height: 100px;
        min-width: 100px;
        min-height: 100px;
    }
    @media (max-width: 570px) {
        margin-bottom: 30px;
    }
`
const UserDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`
const NameSpan = styled.span`
    color: ${(props) => props.theme.colors.githubGray};
    font-size: 30px;
    font-weight: 500;
`
const GitHubUrl = styled.a`
    color: ${(props) => props.theme.colors.lightGray};
    font-size: 18px;
    font-weight: 400;
`
const Description = styled.p`
    max-width: 400px;
    color: ${(props) => props.theme.colors.lightGray};
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 0px;
    margin-top: 5px;
`
const ContentWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`
const Title = styled.span`
    font-size: 35px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.githubGray};
    @media (max-width: 700px) {
        font-size: 28px;
    }
`
const SubTitle = styled.span`
    font-size: 20px;
    font-weight: 300;
    color: ${(props) => props.theme.colors.lightGray};
    @media (max-width: 700px) {
        font-size: 18px;
    }
`
const TilesWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
`
const BodyContent = styled(Content)`
    flex-direction: column;
    align-items: flex-start;
`

const UserLoginPage = (props) => {
    const { profileData, repos } = props.userData

    console.log(repos)

    // States
    const [usersDisplayedRepos, setUsersDisplayedRepos] = useState(repos)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    // Loading more fields
    const _loadMoreFields = async () => {
        let response = await fetch(`/api/get-user-repos/${profileData.login}?page=${page + 1}`)
        response = await response.json()

        if (response.repos.length === 0) setHasMore(false)

        // Updating list and updating page
        setUsersDisplayedRepos(usersDisplayedRepos.concat(response.repos))
        setPage(page + 1)
    }

    return (
        <>
            <MainHeader>
                <LogoWrapper>
                    <HeaderLogo />
                </LogoWrapper>
            </MainHeader>
            <UserHeaderMain>
                <Content>
                    <ProfilePicture src={profileData.avatar_url} />
                    <UserDetailsWrapper>
                        <NameSpan>{profileData.name}</NameSpan>
                        <GitHubUrl href={profileData.html_url} target="blank">
                            {profileData.html_url.replace('https://', '')}
                        </GitHubUrl>
                        <Description>{profileData.bio}</Description>
                    </UserDetailsWrapper>
                </Content>
            </UserHeaderMain>
            <ContentWrapper>
                <BodyContent>
                    <TitleWrapper>
                        <Title>Public repositories</Title>
                        <SubTitle>All user's public repositories</SubTitle>
                    </TitleWrapper>
                    <InfiniteScroll
                        dataLength={usersDisplayedRepos.length}
                        next={_loadMoreFields}
                        hasMore={hasMore}
                        loader={hasMore && <LongListLoader />}
                    >
                        <TilesWrapper>
                            {usersDisplayedRepos.map((repo, index) => (
                                <RepositoryTile
                                    key={index}
                                    name={repo.name}
                                    description={repo.description}
                                    htmlUrl={repo.html_url}
                                />
                            ))}
                        </TilesWrapper>
                    </InfiniteScroll>
                </BodyContent>
            </ContentWrapper>
        </>
    )
}

// Fetching page data on server side / client side, better SEO
UserLoginPage.getInitialProps = async (context) => {
    const { userLogin } = context.query

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-user-data/${userLogin}`)
    let response
    if (res.ok) {
        response = await res.json()
    } else {
        return { err: true }
    }

    return { userData: response.userData }
}

export default UserLoginPage
