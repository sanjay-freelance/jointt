import React, {useState, useEffect, Suspense, lazy} from 'react';

export default function DynamicImport(props){
	const {path} = props;

	const [Component, setComponent] = useState(null);

	// componentDidMount, componentDidUpdate
	useEffect(()=>{
		let uiComponent = lazy(()=> import(`editor/pages/${path}`));
		setComponent(uiComponent);
	},[path]);

	if(!Component) {
		return null;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Component/>
		</Suspense>
	)
}

