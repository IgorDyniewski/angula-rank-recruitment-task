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
export const Button = React.forwardRef((props, ref) => {
    return (
        <ButtonMain {...props} ref={ref}>
            <ButtonText hideTextOnMobileScreenWidth={props.hideTextOnMobileScreenWidth}>{props.children}</ButtonText>
            {props.icon && (
                <ButtonIcon hideTextOnMobileScreenWidth={props.hideTextOnMobileScreenWidth} src={props.iconSrc} />
            )}
        </ButtonMain>
    )
})
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

// Styled components for "every" page
export const HeaderBackgroundWrapper = styled.div`
    width: 100vw;
    position: relative;
    background-image: url('/assets/top-bg.svg');
    background-size: 100%;
    background-position: 0px 0px;
    min-width: 1700px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: -1;
`
export const HeaderBackground = styled.div`
    width: 100%;
    padding-top: ${(530 / 1920) * 100}%;
    position: relative;
`
export const HeaderWrapper = styled.div`
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    height: 240px;
    padding-bottom: 7px;
    box-sizing: border-box;
    z-index: 2;
    background-color: ${(props) => props.theme.colors.githubGray};
`
export const LogoWrapper = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const HeaderLogo = styled.div`
    height: 80%;
    width: 160px;
    background-image: url('/assets/logo.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
export const TopFixedContent = styled.div`
    width: calc(100vw - 40px);
    max-width: 690px;
    height: calc(100% - 80px);
    border-bottom: ${(props) => (props.isBorderVisible ? `2px solid ${props.theme.colors.lightGray}` : 'none')};
`
export const ScrollContentWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    max-width: 690px;
    top: 0px;
    left: 0px;
    z-index: 0;
    padding-left: 10px;
    padding-right: 10px;
`
export const CenterWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 0;
    padding-left: 10px;
    padding-right: 10px;
`
export const PseudoListElement = styled.div`
    height: 280px;
`
export const LoadedTopFixedContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 20px;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
`
