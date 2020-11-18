import React from 'react';
import {useLocation} from 'react-router-dom';
import Header from 'editor/header';
import Routes from 'abstract/ui/routes';
import useSticky from 'abstract/hooks/useSticky';
import {pageLinks} from 'metadata/pageRoute';
import './app.css';
import styled from "styled-components";



const AppDiv = styled('div').attrs(() => ({
	className: 'app'
}))`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
AppDiv.displayName = 'AppDiv';

const StyledHeader = styled('header').attrs(() => ({
	className: 'app-header'
}))`
  height: 16vh;
`;
StyledHeader.displayName = 'StyledHeader';

const StyledSection = styled('section').attrs(() => ({
	className: 'app-view-area'
}))`
  height: 84vh;
  overflow: auto;
`;
StyledSection.displayName = 'StyledSection';


export default function App(props){
	const location = useLocation();
	const {isSticky, element} = useSticky();

	return (
		<AppDiv>
			<StyledHeader>
				<Header links={pageLinks}
								isSticky={isSticky}
								element={element}
								logoUrl=""/>
			</StyledHeader>
			<StyledSection>
				<Routes links={pageLinks}/>
			</StyledSection>
		</AppDiv>
	)
}


