import React, {useContext, useEffect,useState} from 'react';
import {DataContext} from './provider';


function useGetPageName(){
	const {pageName, setPageName} = useContext(DataContext);
	return [pageName,setPageName];
}

function useGetPageDescription(){
	const {description, setDescription} = useContext(DataContext);
	return [description,setDescription];
}


export {
	useGetPageName,
	useGetPageDescription
}