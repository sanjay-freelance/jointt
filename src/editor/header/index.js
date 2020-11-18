import React, {useRef, useState, useEffect} from 'react';
import NavBar from 'abstract/ui/navbar';

export default function Header(props){
	const {links} = props;

	return (
		<div className='header'>
			<NavBar links={links}/>
		</div>
	)
}

