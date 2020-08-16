import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const Render = (jsx, element) => {
	ReactDOM.render(<React.StrictMode>{jsx}</React.StrictMode>, element);
};

const app = <App />,
	root = document.getElementById("root");

Render(app, root);


