import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Components
import Spinner from './Spinner'

// Styled components
const MainWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
`
const Text = styled.span`
    color: white;
    margin-top: 20px;
    font-size: 15px;
    color: ${(props) => props.theme.colors.textSecondary};
`

const LoadingDataBanner = (props) => {
    return (
        <MainWrapper>
            <Spinner />
            {props.loadingText && <Text>{props.loadingText}</Text>}
        </MainWrapper>
    )
}

// Checking props
LoadingDataBanner.propTypes = {
    loadingText: PropTypes.string,
}
export default LoadingDataBanner
