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
import PendingPost from "../Dashboard/PendingPost/PendingPost";
import ProductDetails from "../Components/Productdetails/ProductDetails";
import MyProducts from "../Dashboard/MyProducts/MyProducts";
import Setting from "../Dashboard/Setting/Setting";
import ReportPost from "../Dashboard/ReportPost/ReportPost";
import Coupons from "../Dashboard/Coupons/Coupons";
import ForbiddenPage from "../Components/ForbiddenPage/ForbiddenPage";
import Forbidden403 from "../Components/ForbiddenPage/Forbidden403 ";
import MixRole from "../Routes/MixRole";
import AdminRole from "../Routes/adminRole";
import CreateFeaturedProduct from "../Dashboard/CreateFeaturedProduct/CreateFeaturedProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorElement />,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/product/details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorElement />,
    children: [
      {
        path: "*",
        Component: ErrorElement,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "manage-users",
        element: <AdminRole><ManageUsers/></AdminRole>
      },
      {
        path: "pending-post",
        element: <MixRole><PendingPost /></MixRole>,
      },
      {
        path: "myProducts",
        Component: MyProducts,
      },
      {
        path: "reports",
        element: <MixRole><ReportPost/></MixRole>,
		},
		{
			path: "create-featured-product",
			element: <MixRole><CreateFeaturedProduct/></MixRole>
	  },
      {
        path: "coupons",
        Component: Coupons,
      },
      {
        path: "settings",
        Component: Setting,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginForm,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forbidden",
    Component: ForbiddenPage,
  },
  {
    path: "/forbidden403",
    Component: Forbidden403,
  },
]);
