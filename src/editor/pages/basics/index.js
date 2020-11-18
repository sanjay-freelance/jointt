import React, {useRef, useEffect,useState} from 'react';
import Form from 'abstract/ui/form';
import { validators, formMetaData, getFieldsFromMetaData} from 'metadata/basicPageForm';

export default function Basics(){
	return (
	<div className='basics'>
		<Form id="userForm"
					fields={getFieldsFromMetaData()}
					metaData={formMetaData}
					editable={true}
					validators={validators}
					name="user"
					submitLabel="Save"
		/>
	</div>
	)
}





