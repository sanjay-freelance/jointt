import React, {useRef, useEffect,useState} from 'react';
import Form from 'abstract/ui/form';
import { validators, formMetaData} from 'metadata/basicPageForm';
import {useGetPageName, useGetPageDescription} from "context/consumer";


function getFieldsFromMetaData(fieldValues){
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

export default function Basics(){
	const [pageName, setPageName] = useGetPageName();
	const [description, setDescription] = useGetPageDescription();

	function handleFieldChange(field, newVal){
		if(field.name == 'pageName'){
			setPageName(newVal);
		} else if(field.name == 'description'){
			setDescription(newVal);
		}
	}

	const fields = getFieldsFromMetaData({
		'pageName': pageName,
		'description': description,
	});

	return  (
	<div className='basics'>
		<Form id="userForm"
					fields={fields}
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





