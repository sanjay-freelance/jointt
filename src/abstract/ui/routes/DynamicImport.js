import React, {useState, useEffect} from 'react';


export default function DynamicImport(props){
	const {path} = props;
	const [Component, setComponent] = useState(null);

	// todo: webpack chuck are loaded by http request,
	// that time the path for these chunks are not relative
	// temp solution: use eager mode
	useEffect(()=>{
		import(/* webpackMode: "eager" */ `editor/pages/${path}`).then((module)=>{
			const uiComponent = module.default ? module.default : module;
			setComponent(uiComponent);
		});

	},[]);

	if(!Component){
		return null;
	}

	return Component;
}