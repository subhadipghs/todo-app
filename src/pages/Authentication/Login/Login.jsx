import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Flex = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${(props) => props.margin || 0};
	padding: ${(props) => props.padding || 0};
`;

const LoginCard = styled(Card)`
	width: 30rem;
	height: auto;
	padding-bottom: 2rem;
`;

const TextCenter = styled.p`
	text-align: center;
	font-weight: ${(props) => props.fontWeight || "normal"};
	margin-top: ${(props) => props.marginTop || "4%"};
	padding: ${(props) => props.padding || 0};
`;

function Login(props) {
	const [formData, setFormData] = useState({});

	const submitForm = (e) => {
		e.preventDefault();
		const authenticationBearerToken = window.localStorage.getItem("token");
		console.log(formData);
		
	};

	const setAllFormData = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Flex>
			<LoginCard>
				<Card.Title>
					<TextCenter>Log into your account</TextCenter>
				</Card.Title>
				<Card.Body>
					<Form onSubmit={(e) => submitForm(e)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								placeholder="Enter email"
								onChange={(e) => setAllFormData(e)}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								placeholder="Password"
								onChange={(e) => setAllFormData(e)}
							/>
						</Form.Group>
						<Flex>
							<Button variant="dark" type="submit" block>
								Submit
							</Button>
						</Flex>
					</Form>
				</Card.Body>
			</LoginCard>
		</Flex>
	);
}

export default Login;
