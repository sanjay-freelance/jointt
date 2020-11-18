import styled from "styled-components";


const Nav = styled('nav').attrs(() => ({
	className: 'nav-bar-container'
}))`
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  align-items: center;
`;
Nav.displayName = 'Nav';


const NavUl = styled('ul').attrs(() => ({
	className: 'nav-bar'
}))`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 100%;
  padding: 0px;
  margin: 0px;
  list-style: none;
`;
NavUl.displayName = 'NavUl';


const NavLi = styled('li').attrs(() => ({
	className: 'nav-link'
}))`
  text-decoration: none;
`;
NavLi.displayName = 'NavLi';


export {
	Nav,
	NavUl,
	NavLi
}