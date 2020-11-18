import React, { useEffect, useState } from 'react';
import { FormContainer, FlexForm, ControllerDiv, FormButton } from './styledElement';
import useForm from 'abstract/hooks/useForm';

import FormGroup from './FormGroup';


// Create key value pair to prepare data to POST
const getFormValues = (fields) => {
	let formValues = {};
	fields.forEach((field) => {
		const { name, value } = field;
		formValues[name] = value;
	});
	return formValues;
};


export default function Form(props) {
	const {
		id: formId,
		editable,
		validators,
		onSubmit,
		name,
		submitLabel,
		metaData,
		fields
	} = props;


	const { formFields, isValid, handleChange, reset } = useForm(fields, validators);
	console.log(isValid);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(getFormValues(formFields));
	};

	const handleReset = (event) => {
		event.preventDefault();
		reset();
	};


	return (
		<FormContainer>
			<FlexForm onSubmit={handleSubmit} noValidate>
				<FormGroup metaData={metaData}
									 fields={formFields}
									 handleChange={handleChange}
									 editable={editable}
									 formId={formId} />
				<ControllerDiv>
					<FormButton disabled={!editable || !isValid}>
						{submitLabel ? submitLabel : 'Submit'}
					</FormButton>
					<FormButton disabled={!editable} onClick={handleReset}>
						Reset
					</FormButton>
				</ControllerDiv>
			</FlexForm>
		</FormContainer>
	);
};


