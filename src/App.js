import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./layouts/Layout";
// import Home from "./pages/Home";
import Homee from "./pages/Home/Homee";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import { Routes, Route } from "react-router-dom";
import ProductsDetailsPage from "./pages/ProductsDetailsPage/ProductsDetailsPage";
import Carts from "./pages/carts/Carts";
import UserProfile from "./pages/userprofile/UserProfile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import Shipping from "./pages/shipping/Shipping";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import UserOrders from "./pages/userOrders/UserOrders";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CommonAdminLayout from "./pages/Admin/CommonAdminLayout";
import AdminProductspage from "./pages/Admin/AdminProductspage";
import AddProducts from "./pages/Admin/AddProducts";
import AddCategory from "./pages/Admin/AddCategory";
import Orders from "./pages/Admin/Orders";
import toast, { Toaster } from "react-hot-toast";
import Error from "./pages/Error/Error";
import UserProtectedRoutes from "./components/Protected/UserProtectedRoutes";
import AdminProtectedRoutes from "./components/Protected/AdminProtectedRoutes";
import Payment from "./pages/payments/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";

function App() {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 3000);
  }, []);

  useEffect(()=>{
    window.scrollTo(0,0);
    },[])
    
  const stripePromise = loadStripe(
    "pk_test_51MjxpKSGb0BURskz9CIQiT7U2MHYkfpGhMrd0YtHJfBSzMIgRYtohpDtQv0oNAwUoSDVpRZbASEK1hDVCaqZwbYP00zMprVSIl"
  );
  return (
    <>
      {spin ? (
        <Loader />
      ) : (
        <Elements stripe={stripePromise}>
          {/* admin routeds */}
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <CommonAdminLayout>
                  <AdminProtectedRoutes Components={AdminDashboard} />
                </CommonAdminLayout>
              }
            />
            <Route
              path="/admin/products"
              element={
                <CommonAdminLayout>
                  <AdminProtectedRoutes Components={AdminProductspage} />
                </CommonAdminLayout>
              }
            />
            <Route
              path="/admin/addproducts"
              element={
                <CommonAdminLayout>
                  <AdminProtectedRoutes Components={AddProducts} />
                </CommonAdminLayout>
              }
            />
            <Route
              path="/admin/addcategory"
              element={
                <CommonAdminLayout>
                  <AdminProtectedRoutes Components={AddCategory} />
                </CommonAdminLayout>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <CommonAdminLayout>
                  <AdminProtectedRoutes Components={Orders} />
                </CommonAdminLayout>
              }
            />
            <Route
              path="/admin/login"
              element={
                <Layout>
                  <AdminLogin />
                </Layout>
              }
            />
          </Routes>

          {/* userroutes */}
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Homee />
                </Layout>
              }
            />
            <Route
              path="/products"
              element={
                <Layout>
                  <ProductsPage />
                </Layout>
              }
            />
            <Route
              path="/productdetails/:id"
              element={
                <Layout>
                  <ProductsDetailsPage />
                </Layout>
              }
            />
            <Route
              path="/carts"
              element={
                <Layout>
                  <UserProtectedRoutes Components={Carts} />
                </Layout>
              }
            />
            <Route
              path="/userprofile"
              element={
                <Layout>
                  <UserProtectedRoutes Components={UserProfile} />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <Layout>
                  <ForgotPassword />
                </Layout>
              }
            />
            <Route
              path="/resetpassword/:id/:token"
              element={
                <Layout>
                  <ResetPassword />
                </Layout>
              }
            />
            <Route
              path="/shipping"
              element={
                <Layout>
                  <UserProtectedRoutes Components={Shipping} />
                </Layout>
              }
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <UserProtectedRoutes Components={CheckoutPage} />
                </Layout>
              }
            />
            <Route
              path="/payment"
              element={
                <Layout>
                  <UserProtectedRoutes Components={Payment} />
                </Layout>
              }
            />
            <Route
              path="/userorders"
              element={
                <Layout>
                  <UserProtectedRoutes Components={UserOrders} />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <Error />
                </Layout>
              }
            />
          </Routes>
          <Toaster />
        </Elements>
      )}
    </>
  );
}

export default App;
