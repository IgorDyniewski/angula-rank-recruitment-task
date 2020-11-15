import React from 'react'
import Lottie from 'react-lottie'
import animationData from './communication.json'
import styled from 'styled-components'

// Styled components
const Wrapper = styled.div``

export default class LottieControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isStopped: false, isPaused: false }
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        }

        return (
            <Wrapper>
                <Lottie
                    options={defaultOptions}
                    height={170}
                    width={170}
                    isStopped={this.state.isStopped}
                    isPaused={this.state.isPaused}
                />
            </Wrapper>
        )
    }
}
