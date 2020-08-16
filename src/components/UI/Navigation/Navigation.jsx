import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from '../../../context/AuthContext';

const Container = styled.div`
	padding: 0.5rem;
`;

const StyledLink = styled(Link)`
	border: none;
	color: ${(props) => (!props.dark ? "#fafafa" : "#704070")};

	&:hover {
		color: ${(props) => (!props.dark ? "#fff" : "#333")};
	}
`;

const Text = styled.div`
	color: #fff;
`;

const Navigation = ({ brand, dark }) => {

	const { auth, } = React.useContext(AuthContext);
	const navItems = auth.isAuthenticated !== true ? (
		<Fragment>
			<StyledLink to="/login" className="ml-2 mr-2">
				Log In
			</StyledLink>
			<StyledLink to="/signup" className="ml-2 mr-2" dark>
				Sign up
			</StyledLink>
		</Fragment>
	) : (
		<Text>
			Welcome, {auth.user ? auth.user : null}
		</Text>
	);

	return (
		<Navbar bg="dark" variant="dark">
			<Container 	className="mr-auto">
				<StyledLink to="/">
					<Navbar.Brand
						style={{ fontWeight: "bold" }}	
					>
						{brand}
					</Navbar.Brand>
				</StyledLink>
			</Container>
			<Container>
				{navItems}
			</Container>
		</Navbar>
	);
};


export default Navigation;
