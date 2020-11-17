import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Components
import Spinner from 'react-spinners/BarLoader'

// Styled components
const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Text = styled.span`
    color: white;
    margin-top: 30px;
    font-size: 15px;
    color: ${(props) => props.theme.colors.textSecondary};
    text-align: center;
`

const LoadingDataBanner = (props) => {
    return (
        <MainWrapper>
            <Spinner color={'white'} />
            {props.loadingText && <Text>{props.loadingText}</Text>}
        </MainWrapper>
    )
}

// Checking props
LoadingDataBanner.propTypes = {
    loadingText: PropTypes.string,
}
export default LoadingDataBanner
