import React from 'react'
import { AuthContext } from '../../context/AuthContext';

const Home = (props) => {

	const auth =  React.useContext(AuthContext);

	return (
		<div className="w-full d-flex justify-center align-center">
			This is home page! {JSON.stringify(auth)}
		</div>
	)
}

export default Home