import React, {useState, useEffect} from 'react';


export default function DynamicImport(props){
	const {path} = props;
	const [Component, setComponent] = useState(null);

	useEffect(()=>{
		import(`editor/pages/${path}`).then((module)=>{
			const uiComponent = module.default ? module.default : module;
			setComponent(uiComponent);
		});

	},[]);

	if(!Component){
		return null;
	}

	return Component;
}