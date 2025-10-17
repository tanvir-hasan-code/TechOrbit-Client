import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Components/HomeComponents/Home/Home";
import LoginForm from "../Auth/Authentication/Pages/Login/Login";
import Register from "../Auth/Authentication/Pages/Register/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MyProfile from "../Dashboard/MyProfile/MyProfile";
import PrivateRoute from "../Routes/PrivateRoute";
import ManageUsers from "../Dashboard/ManageUsers/ManageUsers";
import ErrorElement from "../Components/Error/ErrorElement";
import AddProduct from "../Components/AddProduct/AddProduct";
import Products from "../Components/Products/Products";

export const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorElement/>,
		Component: RootLayout,
		children: [
			{
				index: true,
				Component: Home
			},
			{
				path: "/products",
				Component: Products
			},
			{
				path: "/add-product",
				element: <PrivateRoute><AddProduct/></PrivateRoute>
			}
		]
	},
	{
		path: "/dashboard",
		element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
		errorElement: <ErrorElement/>,
		children: [
			{
				path: "*",
				Component: ErrorElement
		},
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