import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Components
import { Button as ButtonImport } from './Elements'

// Styled components
const Main = styled.div`
    width: calc((100% / 3) - 20px);
    margin: 10px;
    height: 200px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.textSecondary};
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    @supports (backdrop-filter: blur(15px)) {
        backdrop-filter: saturate(180%) blur(15px);
    }
    @media (max-width: 1000px) {
        width: calc((100% / 2) - 20px);
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`
const RepoName = styled.span`
    font-weight: 500;
    color: ${(props) => props.theme.colors.blue};
    font-size: 20px;
`
const RepoDescription = styled.span`
    font-weight: 400;
    color: ${(props) => props.theme.colors.lightGray};
    font-size: 16px;
    margin-top: 10px;
    max-width: 100%;
`
const Button = styled(ButtonImport)`
    position: absolute;
    right: 20px;
    bottom: 20px;
`

const RepositoryTile = (props) => {
    return (
        <Main>
            <RepoName>{props.name}</RepoName>
            <RepoDescription>
                {props.description
                    ? props.description.length < 105
                        ? props.description
                        : props.description.substr(0, 105) + '...'
                    : 'No description'}
            </RepoDescription>
            <a href={props.htmlUrl} target="blank">
                <Button icon iconSrc={'/assets/go-to-profile-icon.svg'}>
                    Go to repo
                </Button>
            </a>
        </Main>
    )
}

// Checking prop types
RepositoryTile.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    href: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
}

export default RepositoryTile
