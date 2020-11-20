import React from 'react';
import styled from "styled-components";
import FormInputField from "./FormInputField";


const HDiv = styled('div').attrs(() => ({
	className: 'hDiv'
}))`
    display: flex;
    flex-direction: row;
`;

const VDiv = styled('div').attrs(() => ({
	className: 'vDiv'
}))`
    display: flex;
    flex-direction: column;
`;

const BorderedDiv = styled('div').attrs(() => ({
	className: 'BorderedDiv'
}))`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 32px;
`;

export default function FormGroup (props) {
	const { metaData, handleChange, editable, formId, fields, handleBlur} = props;

	const {children:formChildren, layout} = metaData;

	const formGrpUis = [];
	const formFieldUis = [];

	formChildren.map((formElement)=>{
		const {name: fieldName, type, readOnly,layout:grpLayout} = formElement;

		if(type === 'group'){
			formGrpUis.push(<FormGroup metaData={formElement}
																 key={fieldName}
																 handleChange={handleChange}
																 handleBlur={handleBlur}
																 layout={grpLayout}
																 formId={formId}
																 fields={fields}
																 editable={editable}/>)
		} else {
			const fieldObj = fields[fieldName];
			const {isValid: isFieldValid, instantValidation} = fieldObj;
			const isInvalid = editable && instantValidation && isFieldValid === false;

			const fieldId = formId + fieldName;
			const isFieldEditable = !readOnly && editable;

			let formFieldUi = null;
			let fieldValue = fieldObj.value;

			if (type === 'text' || type === 'email') {
				formFieldUi = (
					<FormInputField id={fieldId}
													key={fieldName}
													editable={isFieldEditable}
													isInvalid={isInvalid}
													onChange={handleChange}
													onBlur={handleBlur}
													value={fieldValue}
													field={fieldObj}/>
				);
			} else {
				// todo: Support other type case here when required
				formFieldUi = (
					<FormInputField id={fieldId}
													key={fieldName}
													editable={isFieldEditable}
													isInvalid={isInvalid}
													onChange={handleChange}
													onBlur={handleBlur}
													field={formElement}/>
				);
			}

			formFieldUis.push(formFieldUi)
		}
	});

	if(layout === 'horizontal'){
		return (
			<HDiv>
				{formFieldUis.length > 0?  <BorderedDiv>{formFieldUis}</BorderedDiv> : null}
				{formGrpUis}
			</HDiv>
		);
	} else {
		return (
			<VDiv>
				{formFieldUis.length > 0?  <BorderedDiv>{formFieldUis}</BorderedDiv> : null}
				{formGrpUis}
			</VDiv>
		);
	}


};


