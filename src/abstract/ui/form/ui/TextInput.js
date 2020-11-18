import * as React from 'react';
import styled from "styled-components";

const StyledInput = styled('input')`
    border: 1px solid;
    border-color: ${props => props['aria-invalid'] ? 'red' : 'grey'};
    border-radius: 0.1875rem;
    padding: 0.625rem;
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
`;

const StyledTextArea = styled('textarea')`
    border: 1px solid;
    border-color: ${props => props['aria-invalid'] ? 'red' : 'grey'};
    border-radius: 0.1875rem;
    padding: 0.625rem;
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
`;

export default function TextInput (props){
	const {id,name,type,hidden,value,onChange,onKeyDown,disabled,required = false,placeholder,invalid,onBlur,className } = props;

	const updateInputValue = (event) => onChange(event.target.value);

	const InputUI = type == 'textArea' ? StyledTextArea : StyledInput;

	return (
		<InputUI className={className}
								 disabled={disabled}
								 type={hidden === 1 ? 'password' : type}
								 name={name === undefined ? id : name}
								 placeholder={placeholder}
								 required={required}
								 aria-required={required}
								 id={id}
								 aria-invalid={invalid}
								 value={value}
								 onChange={updateInputValue}
								 onKeyDown={onKeyDown}
								 onBlur={onBlur}/>
	);
};


