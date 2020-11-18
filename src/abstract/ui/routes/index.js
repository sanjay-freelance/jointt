import React from 'react';
import {Switch, Route} from 'react-router';
import DynamicImport from './DynamicImport';

export default function Routes(props){
	const {links} = props;
	const routeUI = links.map((pageLink, index)=>{
		const {title, link, importPath} = pageLink;
		return (
		<Route key={title} exact path={link}>
			<DynamicImport path={importPath}/>
		</Route>
		)
	})

	return (
	<Switch>
		{routeUI}
	</Switch>
	)
}


