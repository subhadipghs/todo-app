import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/UI/Layout/Layout";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import Home from "./pages/Home/Home";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from './routes/PrivateRoute';

function App() {

	const [auth, setAuth] =  React.useState({
		isAuthenticated: false,
		token: null,
		user: null
	});


	return (
		<AuthContext.Provider value={{auth, setAuth}}>
			<Layout>
				<Switch>	
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/" component={Home} />
				</Switch>
			</Layout>
		</AuthContext.Provider>
	);
}

export default App;
