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
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
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
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 200ms ease-in-out;
    :hover {
        background-color: ${(props) => props.theme.colors.blueHover};
    }
    :focus {
        outline: none;
    }
`
const ButtonText = styled.span`
    color: ${(props) => props.theme.colors.buttonText};
    font-size: 14px;

    /* Hiding text on mobile */
    @media (max-width: ${(props) => (props.hideTextOnMobileScreenWidth ? props.hideTextOnMobileScreenWidth : 0)}px) {
        display: none;
    }
`
const ButtonIcon = styled.div`
    width: 13px;
    height: 13px;
    background-image: url('${(props) => props.src}');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 10px;

    /* Hiding margin on mobile */
    @media (max-width: ${(props) => (props.hideTextOnMobileScreenWidth ? props.hideTextOnMobileScreenWidth : 0)}px) {
        margin-left: 0px;
    }
`
export const Button = (props) => {
    return (
        <ButtonMain {...props}>
            <ButtonText hideTextOnMobileScreenWidth={props.hideTextOnMobileScreenWidth}>{props.children}</ButtonText>
            {props.icon && (
                <ButtonIcon hideTextOnMobileScreenWidth={props.hideTextOnMobileScreenWidth} src={props.iconSrc} />
            )}
        </ButtonMain>
    )
}
// Checking types
ButtonMain.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    button: PropTypes.bool,
    iconSrc: PropTypes.string,
    hideTextOnMobileScreenWidth: PropTypes.number,
}

// Select
const SelectMain = styled.select`
    background-color: ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.buttonText};
    border: none;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 200ms ease-in-out;
    :hover {
        background-color: ${(props) => props.theme.colors.blueHover};
    }
    :focus {
        outline: none;
    }
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('/assets/list.svg');
    background-repeat: no-repeat;
    background-position-x: calc(100% - 10px);
    background-position-y: 50%;
`
export const Select = (props) => {
    return <SelectMain {...props}>{props.children}</SelectMain>
}
// Checking types
Select.propTypes = {
    children: PropTypes.array.isRequired,
}
