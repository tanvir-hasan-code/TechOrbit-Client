import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: RootLayout
	},
])