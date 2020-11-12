import React from 'react'
import styled from 'styled-components'

// Styled components
const Test = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
`

const IndexPage = () => {
    return (
        <div>
            <Test />
        </div>
    )
}

export default IndexPage
