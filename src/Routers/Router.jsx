import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Components/HomeComponents/Home/Home";
import LoginForm from "../Auth/Authentication/Pages/Login/Login";
import Register from "../Auth/Authentication/Pages/Register/Register";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: RootLayout,
		children: [
			{
				index: true,
				Component: Home
			}
		]
	},
	{
		path: "/login",
		Component: LoginForm
	},
	{
		path: "/register",
		Component: Register
	}
])