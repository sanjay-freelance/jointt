
const validators = {
	pageName: {
		customValidator: {
			predicate: value => {
				return value.length >= 3;
			},
			message: 'Must Contain min 3 chars',
		},
	},
	email: {
		pattern: {
			regex: `^(([-\\w\\d]+)(\\.[-\\w\\d]+)*@([-\\w\\d]+)(\\.[-\\w\\d]+)*(\\.([a-zA-Z]{2,5}|[\\d]{1,3})){1,2})$`,
			message: 'Invalid Email Format',
		},
	}
};

const formMetaData = {
	type: 'group',
	name: 'group1',
	layout: 'vertical',
	children: [
		{
			type: 'group',
			label: 'group1',
			name: 'group1',
			layout: 'vertical',
			children: [
				{
					type: 'text',
					label: 'Page Name',
					name: 'pageName',
					required: true,
					description: 'Page Name Description',
				},
				{
					type: 'email',
					label: 'Email',
					name: 'email',
					required: true,
					description: 'Email Description'
				},
				{
					type: 'file',
					label: 'Profile Photo',
					name: 'profilePhoto',
					layout: 'vertical',
					description: 'Profile Photo Description'
				},
			]
		},
		{
			type: 'group',
			label: 'group2',
			name: 'group2',
			layout: 'vertical',
			children: [
				{
					type: 'file',
					label: 'Cover Photo',
					name: 'coverPhoto',
					description: 'Cover Photo Description'
				}
			]
		},
		{
			type: 'group',
			label: 'group3',
			name: 'group3',
			layout: 'vertical',
			children: [
				{
					type: 'text',
					label: 'About your page',
					name: 'aboutPage',
					layout: 'vertical',
					description: 'This is the first thing potential clients will see when they land on your page, so make sure you paint a compelling picture of how they can join you on this journey.'
				}
			]
		}
	]
};

function getFieldsFromMetaData(){
	const resultObj = {};

	 getFields(formMetaData.children, resultObj);
	return resultObj;
}

function getFields(childrenMetaData, resultObj){
	childrenMetaData.map((childMetadata)=>{
		const {type, children, name} = childMetadata;
		if(type == 'group'){
			getFields(children,resultObj)
		} else {
			resultObj[name] = childMetadata;
		}
	});
}

export {
	getFieldsFromMetaData,
	validators,
	formMetaData
}
