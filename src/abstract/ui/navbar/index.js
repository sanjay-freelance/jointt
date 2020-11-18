import React from 'react';
import NavLink from './NavLink'
import {Nav, NavUl} from './styledElement';
import {useLocation} from 'react-router-dom';


function getPageName(fullPath){
	const paths = fullPath.split('/');
	return paths.length > 0 ? paths[paths.length-1] : '';
}
export default function NavBar(props){
	const {links} = props;

	const location = useLocation();
	const currentPageName = getPageName(location.pathname);

	const linksUI = links.map((linkObject , index)=>{
		const {title, link} = linkObject;
		const linkPageName = getPageName(link);

		return <NavLink key={index}
										isActive={linkPageName == currentPageName}
										linkTo={link}>{title}</NavLink>
	});

	return (
	<Nav>
		<NavUl>
			{linksUI}
		</NavUl>
	</Nav>

	)
}