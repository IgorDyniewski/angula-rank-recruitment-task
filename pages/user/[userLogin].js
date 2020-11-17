import React from 'react'
import styled from 'styled-components'

// Components
import { LogoWrapper, HeaderLogo } from '../../components/Elements'
import RepositoryTile from '../../components/RepositoryTile'

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
`
const ProfilePicture = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 150px;
    border: 4px solid ${(props) => props.theme.colors.blue};
    background-image: url('${(props) => props.src}');
    background-size: cover;
    background-position: center;
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
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 0px;
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
`
const SubTitle = styled.span`
    font-size: 20px;
    font-weight: 300;
    color: ${(props) => props.theme.colors.lightGray};
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
                    <TilesWrapper>
                        {repos.map((repo, index) => (
                            <RepositoryTile key={index} name={repo.name} description={repo.description} />
                        ))}
                    </TilesWrapper>
                </BodyContent>
            </ContentWrapper>
        </>
    )
}

// Fetching page data on server side / client side, better SEO
UserLoginPage.getInitialProps = async (context) => {
    const { userLogin } = context.query

    console.log(context.query)

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
