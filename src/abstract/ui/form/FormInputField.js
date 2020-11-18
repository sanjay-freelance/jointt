import React from 'react';
import styled from "styled-components";
import TextInput from './ui/TextInput';

/*
* Form InputField Styles
* */
const FlexFieldRow = styled('div')`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 1.65rem;
`;

const FlexFieldCol = styled('div')`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 1.65rem;
`;

const VerticalCenterLabel = styled('label').attrs(() => ({
	className: 'form-label'
}))`
    max-width: 10rem;
    min-width: 8rem;
    align-self: center;
    padding-right: 0.25rem;
`;

const HLabelDiv = styled('div')`
    min-width: 16rem;
    align-self: center;
    padding-right: 0.25rem;
`;
const VLabelDiv = styled('div')`
    width: 100%;
    align-self: center;
    padding-right: 0.25rem;
`;

const HInputDiv = styled('div')`
    flex: 1;
    min-width: 20rem;
`;

const VInputDiv = styled('div')`
    width: 100%
`;

const DescriptionDiv = styled('div')`
    color: lightgrey;
    margin-top: 16px;
    margin-bottom: 4px;
`;

const NonLineAbbr = styled('abbr')`
    text-decoration: none;
`;

/*
const MaxWidthTextInput = styled('TextInput')`
    min-width: 14rem;
    margin-top: 0rem;
    max-width: 100%;
`;
*/

const ErrorRelativeContainer = styled('div')`
    position: relative;
`;

const ErrorAbsoluteSpan = styled('label')`
    position: absolute;
    right: 0rem;
    bottom: -0.32rem;
    font-weight: 600;
    text-align: center;
    font-size: 60%;
    padding: 0.24rem 0.4rem;
    margin: 0rem 0.25rem;
    color: red;
`;

export const FormInputField = (props) => {
	const { id, field, editable, isInvalid, onChange, value } = props;
	const { name, label, type, required, validationMessage, description, layout } = field;

	function onChangeHandler(newValue) {
		onChange(field, value, newValue);
	}

	function onBlurHandler() {
		onChange(field, value);
	}

	const descriptionUI =  description ? <DescriptionDiv>{description}</DescriptionDiv> : null;

	let ContainerUI = layout === 'vertical' ? FlexFieldCol : FlexFieldRow;
	let InputContainer = layout === 'vertical' ? VInputDiv : HInputDiv;
	let LabelContainer = layout === 'vertical' ? VLabelDiv : HLabelDiv;


	return (
	<ContainerUI>
		<LabelContainer>
			<VerticalCenterLabel htmlFor={id}>
				{label}
				{required && <NonLineAbbr title="Required"> *</NonLineAbbr>}
			</VerticalCenterLabel>
			{descriptionUI}
		</LabelContainer>

		<InputContainer>
			{isInvalid && (
				<ErrorRelativeContainer>
					<ErrorAbsoluteSpan>
						{validationMessage}
					</ErrorAbsoluteSpan>
				</ErrorRelativeContainer>
			)}
			<TextInput id={id}
								 name={name}
								 type={type}
								 required={required}
								 disabled={!editable}
								 value={value === undefined ? '' : value}
								 invalid={isInvalid}
								 onChange={onChangeHandler}
								 onBlur={onBlurHandler}/>
		</InputContainer>
	</ContainerUI>
	);
};

export default FormInputField;

