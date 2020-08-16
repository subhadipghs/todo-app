import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import useFormSubmit from "../../../hooks/useFormSubmit";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

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
	padding-bottom: 1rem;
	font-weight: bold;
`;

const TextCenter = styled.p`
	text-align: center;
	font-weight: ${(props) => props.fontWeight || "normal"};
	margin-top: ${(props) => props.marginTop || "4%"};
	padding: ${(props) => props.padding || 0};
`;

const Signup = (props) => {

	const [formData, setFormData] = useState({});
	const [formError, setFormError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { auth, setAuth } = React.useContext(AuthContext);

	const submitForm = (e) => {
		e.preventDefault();
		console.log(formData);
		setLoading(true);
		axios
			.post("http://localhost:3001/api/user/signup", formData)
			.then((res) => {
				const { success, message, ...user } = res.data;
				if (!success) {
					setFormError(message);
					setTimeout(() => {
						setFormError('');
					}, 1000)
				} else {
					localStorage.setItem("token", user.token);
					setAuth({
						isAuthenticated: true,
						token: user.token,
						user: user.user,
					});
					setLoading(false);
					history.push("/");
				}
			})
			.catch((error) => {
				setFormError(error.message);
				setLoading(false);
			});
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
					<TextCenter>Create an account</TextCenter>
				</Card.Title>
				<Card.Body>
					{formError && <Alert variant="danger">{formError}</Alert>}
					<Form onSubmit={(e) => submitForm(e)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								name="name"
								placeholder="Enter Name"
								onChange={(e) => setAllFormData(e)}
							/>
						</Form.Group>
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
							<Button
								variant="dark"
								type="submit"
								block
								disable={loading ? "true" : "false"}
							>
								Submit
							</Button>
						</Flex>
					</Form>
				</Card.Body>
			</LoginCard>
		</Flex>
	);
};

export default Signup;
