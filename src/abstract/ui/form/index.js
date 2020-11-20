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
		fields,
		handleFieldChange
	} = props;


	const { formFields, isValid, handleChange, reset } = useForm(fields, validators);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(getFormValues(formFields));
	};

	const handleReset = (event) => {
		event.preventDefault();
		reset();
	};

	function handleChangeAndUpdateReducer(field, oldValue, newValue){
		handleChange(field,oldValue, newValue);
		//todo: change this to use return value of handle Change
		//we might get newValue or validated value
		handleFieldChange(field, newValue);
	}

	function handleBlur(field, oldValue){
		handleChange(field,oldValue);
	}

	return (
		<FormContainer>
			<FlexForm onSubmit={handleSubmit} noValidate>
				<FormGroup metaData={metaData}
									 fields={formFields}
									 handleChange={handleChangeAndUpdateReducer}
									 handleBlur={handleBlur}
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

function getFieldsFromMetaData(formMetaData, fieldValues){
	const resultObj = {};
	getFields(formMetaData.children, resultObj, fieldValues);
	return resultObj;
}

function getFields(childrenMetaData, resultObj, fieldValues){
	childrenMetaData.map((childMetadata)=>{
		const {type, children, name} = childMetadata;
		if(type == 'group'){
			getFields(children,resultObj,fieldValues)
		} else {
			if(fieldValues.hasOwnProperty(name)){
				childMetadata.value =  fieldValues[name];
			}
			resultObj[name] = childMetadata;
		}
	});
}

function GlobalForm(props){
	const {handleFieldChange, values, metaData, validators, name, submitLabel, id, editable} = props;

	const fields = getFieldsFromMetaData(metaData,values);

	return  (
	<Form id={id}
				fields={fields}
				metaData={metaData}
				editable={editable}
				validators={validators}
				name={name}
				handleFieldChange={handleFieldChange}
				submitLabel={submitLabel}
	/>)
}

export {
	GlobalForm
}


