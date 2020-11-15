import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Lotties
import Animation from '../lib/lotties/ErrorAnimation'

// Styled components
const MainWrapper = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Text = styled.span`
    color: white;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.textSecondary};
    text-align: center;
`

const ErrorBanner = (props) => {
    return (
        <MainWrapper>
            <Animation />
            {props.loadingText && <Text>{props.loadingText}</Text>}
        </MainWrapper>
    )
}

// Checking props
ErrorBanner.propTypes = {
    loadingText: PropTypes.string,
}
export default ErrorBanner
