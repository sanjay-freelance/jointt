import React, {useContext, useEffect,useState} from 'react';
import {DataContext} from './provider';


function useGetPageName(){
	const {pageName, setPageName} = useContext(DataContext);
	return [pageName,setPageName];
}

function useGetPageDescription(){
	const {description, setDesc} = useContext(DataContext);
	return [description, setDesc];
}


export {
	useGetPageName,
	useGetPageDescription
}