import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Components
import { Button } from './Elements'

// Styled components
const Main = styled.div`
    width: 100%;
    max-width: 690px;
    height: 80px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 2px solid ${(props) => props.theme.colors.textSecondary};
    background-color: rgba(255, 255, 255, 0.8);
    @supports (backdrop-filter: blur(15px)) {
        backdrop-filter: saturate(180%) blur(15px);
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: 0px 0px 0px rgba(175, 175, 175, 0.8);
`
const LeftWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const ProfilePicture = styled.div`
    width: 53px;
    height: 53px;
    border-radius: 100%;
    background-image: url('${(props) => props.src}');
    background-position: center;
    background-size: cover;
`
const FullNameAndGithubUrlWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const FullName = styled.span`
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.githubGray};
    width: 180px;
    max-width: 180px;
`
const GithubUrl = styled.a`
    color: ${(props) => props.theme.colors.lightGray};
    font-weight: 400;
    font-size: 13px;
    margin-top: 3px;
    cursor: pointer;
`
const DetailsSpan = styled.span`
    font-size: 10px;
    margin-left: 10px;
    background-color: ${(props) => props.theme.colors.githubGray};
    color: ${(props) => props.theme.colors.textSecondary};
    padding: 4px;
    padding-left: 6px;
    padding-right: 7px;
    border-radius: 20px;
`

const UserProfileBar = (props) => {
    return (
        <Main>
            <LeftWrapper>
                <ProfilePicture src={props.profilePictureSrc} />
                <FullNameAndGithubUrlWrapper>
                    <FullName>{props.fullName}</FullName>
                    <GithubUrl href={props.githubUrl} target="_blank">
                        {props.githubUrl.replace('https://', '')}
                    </GithubUrl>
                </FullNameAndGithubUrlWrapper>
                <DetailsSpan>{props.contributions} contributions</DetailsSpan>
                <DetailsSpan>{props.publicRepos} repos</DetailsSpan>
                <DetailsSpan>{props.publicGists} gists</DetailsSpan>
            </LeftWrapper>

            <Button>Go to profile</Button>
        </Main>
    )
}

// Checking types
UserProfileBar.propTypes = {
    profilePictureSrc: PropTypes.string.isRequired,
    githubUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    contributions: PropTypes.number.isRequired,
    gitHubLogin: PropTypes.string.isRequired,
    publicRepos: PropTypes.number.isRequired,
    publicGists: PropTypes.number.isRequired,
}

export default UserProfileBar
