import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Components/HomeComponents/Home/Home";
import LoginForm from "../Auth/Authentication/Pages/Login/Login";
import Register from "../Auth/Authentication/Pages/Register/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MyProfile from "../Dashboard/MyProfile/MyProfile";
import PrivateRoute from "../Routes/PrivateRoute";
import ManageUsers from "../Dashboard/ManageUsers/ManageUsers";

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
		path: "/dashboard",
		element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
		children: [
			{
				path: "profile",
				Component: MyProfile
			},
			{
				path: "manage-users",
				Component: ManageUsers
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