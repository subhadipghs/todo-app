import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";

const LayoutWrapper = styled.div`
	width: 100vw;
`;


const ChildrenWrapper = styled.div`
	width: 100%;
	margin-top: 6rem;
`;

const Layout = ({ children }) => {
	return (
		<Router>
			<LayoutWrapper>
				<Navigation brand="React" />
				<ChildrenWrapper>
					{ children }
				</ChildrenWrapper>
			</LayoutWrapper>
		</Router>
	);
};

export default Layout;
