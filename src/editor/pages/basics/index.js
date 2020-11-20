import React, {useRef, useEffect,useState} from 'react';
import {GlobalForm} from 'abstract/ui/form';
import { validators, formMetaData} from 'metadata/basicPageForm';
import {useGetPageName, useGetPageDescription} from "context/consumer";

export default function Basics(){
	/* Hooking to Global state */
	const [pageName, setPageName] = useGetPageName();
	const [description, setDescription] = useGetPageDescription();

	function handleFieldChange(field, newVal){
		if(field.name == 'pageName'){
			setPageName(newVal);
		} else if(field.name == 'description'){
			setDescription(newVal);
		}
	}

	const values = {
		'pageName': pageName,
		'description': description,
	};

	return  (
	<div className='basics'>
		<GlobalForm id="userForm"
					values={values}
					metaData={formMetaData}
					editable={true}
					validators={validators}
					name="user"
					handleFieldChange={handleFieldChange}
					submitLabel="Save"
		/>
	</div>
	)
}









