import React from 'react'
import styled from 'styled-components'

// theme
import theme from '../lib/theme'

// Components
import Spinner from 'react-spinners/BarLoader'

// Styled components
const Main = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LongListLoader = (props) => {
    return (
        <Main>
            <Spinner color={theme.colors.blue} />
        </Main>
    )
}

export default LongListLoader
