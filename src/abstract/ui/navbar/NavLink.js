import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { NavLi} from './styledElement';

export default function NavLink(props){
	const {children,linkTo, isActive} = props;
	const [hover, setHoverState] = useState(false);

	function handleMouseOver(){
		setHoverState(true);
	}

	function handleMouseLeave(){
		setHoverState(false);
	}

	const className = 'nav-link';

	const linkClassName = isActive ? `${className} nav-link-active` : className;

	return (
		<NavLi onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
			<Link className={linkClassName} to={linkTo} >
				{children}
			</Link>
		</NavLi>
	)
}