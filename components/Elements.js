import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Title wrapper
const TitleWrapperMain = styled.div`
    display: flex;
    flex-direction: column;
`
export const TitleWrapper = (props) => {
    return <TitleWrapperMain {...props}>{props.children}</TitleWrapperMain>
}

// Title
const TitleMain = styled.div`
    color: ${(props) => props.theme.colors.textMain};
    font-size: 40px;
    font-weight: 500;
`
export const Title = (props) => {
    return <TitleMain {...props}>{props.children}</TitleMain>
}
// Checking types
Title.propTypes = {
    children: PropTypes.string.isRequired,
}

// Sub Title
const SubTitleMain = styled.span`
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 16px;
    font-weight: 200;
`
export const SubTitle = (props) => {
    return <SubTitleMain {...props}>{props.children}</SubTitleMain>
}
// Checking types
SubTitle.propTypes = {
    children: PropTypes.string.isRequired,
}

// Button
const ButtonMain = styled.button`
    background-color: ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.buttonText};
    border: none;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 6px;

    :focus {
        outline: none;
    }
`
export const Button = (props) => {
    return <ButtonMain {...props}>{props.children}</ButtonMain>
}
// Checking types
ButtonMain.propTypes = {
    children: PropTypes.string.isRequired,
}
