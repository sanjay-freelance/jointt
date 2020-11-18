import styled from "styled-components";

/*
*  Styles
* */
 const FormContainer = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
`;
 const FlexForm = styled('form').attrs(() => ({
	 className: 'flex-form'
 }))`
    display: flex;
    flex-direction: column;
    width: 60%
`;

 const ControllerDiv = styled('div')`
    display: flex;
    justify-content: flex-end;
    padding-right: 64px;
`;

const FormButton = styled('button').attrs(() => ({
	className: 'form-button'
}))`
   margin: 0.125rem 0.125rem 0.125rem .5rem;
`;


export {
	FormContainer,
	FlexForm,
	ControllerDiv,
	FormButton
}