import React, {createContext, useEffect, useReducer} from "react";
import  reducer, {actionCreators, store} from "./reducers";


const DataContext = createContext(store);


function ProfileProvider(props){
	const { children } = props;
	const { setPageName:pageNameSetter, setDescription:descriptionSetter } = actionCreators;
	const [globalState, dispatch] = useReducer(reducer, store);

	useEffect(()=>{
		/* Once end points are available, data fetching will set initial global state*/
	},[]);

	function setDesc(symbolName){
		dispatch(descriptionSetter(symbolName))
	}

	function setPageName(symbolName){
		dispatch(pageNameSetter(symbolName))
	}

	const context = { ...globalState, setDesc,setPageName };
	return (
	<DataContext.Provider value={context}>
		{children}
	</DataContext.Provider>
	)
}



export {
	// provider
	ProfileProvider,
	// consumers
	DataContext
}