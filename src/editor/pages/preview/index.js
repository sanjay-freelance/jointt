import React, {useRef, useState, useEffect} from 'react';
import {useGetPageName, useGetPageDescription } from 'context/consumer'
import styled from "styled-components";

const PhotoContainer = styled('div').attrs(() => ({
	className: 'photo-container'
}))`
    display: flex;
    flex-direction:column;
    align-items:center;
`;

const ProfileContainer = styled('div').attrs(() => ({
	className: 'photo-container'
}))`
    display: flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    top: -70px;
`;

const CoverPhotoDiv = styled('div').attrs(() => ({
	className: 'cover-photo'
}))`
    width:820px;
    height:312px;
    border: 1px solid grey;
`;

const ProfilePhotoDiv = styled('div').attrs(() => ({
	className: 'profile-photo'
}))`
    width:170px;
    height:170px;
    border-radius: 50%;
    border: 1px solid grey;
`;

export default function Preview(props){
	const [pageName, setPageName] = useGetPageName();
	return (
	<div className='preview'>
		<PhotoContainer>
			<CoverPhotoDiv>

			</CoverPhotoDiv>
			<ProfileContainer>
				<ProfilePhotoDiv>
				</ProfilePhotoDiv>
				<h3>{pageName}</h3>
			</ProfileContainer>


		</PhotoContainer>

	</div>
	)
}

