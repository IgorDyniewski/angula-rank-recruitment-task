import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Constants
const mobileViewSwitchScreenWidth = 740
const hideButtonTextSwitchScreenWidth = 450

// Components
import { Button } from './Elements'

// Styled components
const Main = styled.div`
    width: 100%;
    max-width: 690px;
    height: 80px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid ${(props) => props.theme.colors.textSecondary};
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
    @media (max-width: ${mobileViewSwitchScreenWidth}px) {
        height: auto;
        padding: 10px;
    }
`
const LeftWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: ${mobileViewSwitchScreenWidth}px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
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
    max-width: 180px;
`
const DetailsSpan = styled.span`
    font-size: 10px;
    margin-right: 10px;
    background-color: ${(props) => props.theme.colors.githubGray};
    color: ${(props) => props.theme.colors.textSecondary};
    padding: 4px;
    padding-left: 6px;
    padding-right: 7px;
    border-radius: 20px;
`
const DetailsWrapper = styled.div`
    @media (max-width: ${mobileViewSwitchScreenWidth}px) {
        margin-top: 10px;
    }
`
const ProfilePictureAndNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const UserProfileBar = (props) => {
    return (
        <Main>
            <LeftWrapper>
                <ProfilePictureAndNameWrapper>
                    <ProfilePicture src={props.profilePictureSrc} />
                    <FullNameAndGithubUrlWrapper>
                        <FullName>
                            {props.fullName && props.fullName.length > 14
                                ? props.fullName.substr(0, 14) + '...'
                                : props.fullName}
                        </FullName>
                        <GithubUrl href={props.githubUrl} target="_blank">
                            {props.githubUrl.replace('https://', '')}
                        </GithubUrl>
                    </FullNameAndGithubUrlWrapper>
                </ProfilePictureAndNameWrapper>
                <DetailsWrapper>
                    <DetailsSpan>{props.contributions} contributions</DetailsSpan>
                    <DetailsSpan>{props.publicRepos} repos</DetailsSpan>
                    <DetailsSpan>{props.publicGists} gists</DetailsSpan>
                </DetailsWrapper>
            </LeftWrapper>

            <Button
                icon
                iconSrc={'/assets/go-to-profile-icon.svg'}
                hideTextOnMobileScreenWidth={hideButtonTextSwitchScreenWidth}
            >
                Go to profile
            </Button>
        </Main>
    )
}

// Checking types
UserProfileBar.propTypes = {
    profilePictureSrc: PropTypes.string.isRequired,
    githubUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    contributions: PropTypes.number.isRequired,
    gitHubLogin: PropTypes.string.isRequired,
    publicRepos: PropTypes.number.isRequired,
    publicGists: PropTypes.number.isRequired,
}

export default UserProfileBar
