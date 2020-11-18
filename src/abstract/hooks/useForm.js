import { useEffect, useState } from 'react';

// Validate and provide validate Attributes to form field
const validate = (field, newValue, validators, reset)  => {
	const { name, required, label, readOnly } = field;
	if (readOnly) {
		return null;
	}

	let validator = validators ? validators[name] : null;

	// Fields which are not required and no validators
	// we dont add validation values
	if (!required && !validators) {
		return null;
	}

	let message = '';
	let passedValidation = true;

	if (!newValue) {
		// 1. Required
		if (required) {
			passedValidation = false;
			message = `Enter ${label}`;
		}
	} else if (validator) {
		const { pattern, customValidator } = validator;
		if (
		// 2. Pattern
		typeof newValue === 'string' &&
		pattern &&
		pattern.regex &&
		!new RegExp(pattern.regex).test(newValue)
		) {
			passedValidation = false;
			message = pattern.message;
		} else if (
		// 3. Custom Validation function
		customValidator &&
		customValidator.predicate &&
		!customValidator.predicate(newValue)
		) {
			passedValidation = false;
			message = customValidator.message;
		}
	}

	// turn off Instant validation for invalid field when reset
	const instantValidation = !(!passedValidation && reset);

	return {
		isValid: passedValidation, // This value holds the validity  of the field
		validationMessage: message,
		instantValidation,
	};
};

const loopFields = (fields, iteratorFn, isBoolean)=>{
	const fieldKeys= fields ? Object.keys(fields) : [];
	if(isBoolean) {
		for (let i = 0 ; i < fieldKeys.length; i++){
			const fieldKey = fieldKeys[i];
			const fieldObj = fields[fieldKey];
			const result =iteratorFn(fieldObj)
			if(result !== undefined){
				return result;
			}
		}
		return true;
	} else {
		const newFields = {};
		fieldKeys.map((fieldKey) => {
			const fieldObj = fields[fieldKey];
			newFields[fieldKey] = iteratorFn(fieldObj);
		});
		return newFields;
	}
}

// Makes a copy and Update Field values
// this favors, React Shallow Comparison in useEffect
const updateField = (fields, name, newValues) => {
	return loopFields(fields, (field)=>{
		const fieldCopy = { ...field };
		if (fieldCopy.name === name) {
			const keys = Object.keys(newValues);
			keys.forEach(key => {
				fieldCopy[key] = newValues[key];
			});
		}
		return fieldCopy;
	})
};

// Makes a copy and Update value to empty and Rest validation values
// this favors, React Shallow Comparison in useEffect
const reset = (fields, validators) => {
	return loopFields(fields, (field)=>{
		const validationChanges = validate(field, '', validators, true);
		const fieldCopy = { ...field };
		if (!field.readOnly) {
			fieldCopy.value = '';
		}
		if (validationChanges) {
			Object.assign(fieldCopy, validationChanges);
		}
		return fieldCopy;
	});

};

const isFormValid = (formFields, activeFieldName, isFieldValid) => {
	return loopFields(formFields, (field)=>{
		const { name, isValid } = field;
		// activeField don't have updated validity value
		// so skip and check its current validity value.
		if (activeFieldName !== name) {
			if (isValid === false) {
				return false;
			}
		} else {
			if (!isFieldValid) {
				return false;
			}
		}
	}, true);
};

const isLastRequiredField = (formFields, activeFieldName) => {
	return loopFields(formFields, (field)=>{
		const { name, isValid } = field;
		if (activeFieldName !== name && isValid === false) {
			return false;
		}
	}, true);
};



/*
* Hooks
* */

export default function useForm (fields, validators) {
	const [formFields, setFields] = useState(fields);
	const [isValid, setIsValid] = useState(false);

	// componentDidMount and ComponentDidUpdate
	// Effect function executed only when fields (argument) reference changes
	// Reset Validation and form validity when fields changes (argument)
	useEffect(() => {
		let formValid = true;
		const newFields = loopFields(fields, (fieldObj)=>{
			let fieldCopy = { ...fieldObj };
			const validationChanges = validate(fieldObj, fieldObj.value, validators, true);
			if (validationChanges) {
				Object.assign(fieldCopy, validationChanges);
				if (!validationChanges.isValid) {
					formValid = false;
				}
			}
			return fieldCopy;
		});

		console.log(formValid);
		setFields(newFields);
		setIsValid(formValid);
	}, [fields]);

	const handleChange = (field, oldValue, fieldValue ) => {
		const { name, required, instantValidation } = field;

		const isBlurEvent = fieldValue === undefined;
		const updateOnly = !isBlurEvent && !instantValidation;
		const lastReqField =
		updateOnly && isLastRequiredField(formFields, name);

		let changes = isBlurEvent ? null : { value: fieldValue };

		if (updateOnly) {
			// 1. Only Field Update
			setFields(updateField(formFields, name, changes));

			if (!required || !lastReqField) {
				return;
			}
		}

		const validatingValue = isBlurEvent ? oldValue : fieldValue;
		let validationChanges = validate(field, validatingValue, validators);

		if (validationChanges) {
			// 2. Update Form Validity
			if (changes) {
				Object.assign(changes, validationChanges);
			} else {
				changes = validationChanges;
			}

			const validForm = isFormValid(formFields, name, validationChanges.isValid);
			console.log(validForm);
			setIsValid(validForm);
		}

		if (changes && !lastReqField) {
			// 3. last required field don't update
			setFields(updateField(formFields, name, changes));
		}
	};

	const handleReset = () => {
		setFields(reset(formFields, validators));
		setIsValid(false);
	};

	return {
		formFields,
		isValid,
		handleChange,
		reset: handleReset,
	};
};