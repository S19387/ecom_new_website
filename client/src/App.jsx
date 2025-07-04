import { BrowserRouter, Routes, Route } from "react-router-dom";

import Paymentpage from "./pages/Admin/Paymentpage";
import Users from "./pages/Admin/Users";
import Layout from "./components/Admin/Layout";
import Dashboardpage from "./pages/Admin/Dashboardpage";
import OrdersPage from "./pages/Admin/OrdersPage";
import CategoryPage from "./pages/Admin/CategoryPage";
import AddCategoryPage from "./pages/Admin/AddCategoryPage";
import ReviewsPage from "./pages/Admin/ReviewsPage";
import AddSubCategoryPage from "./pages/Admin/AddSubCategoryPage";
import EditCategoryPage from "./pages/Admin/EditCategoryPage";
import OrderDetailsPage from "./pages/Admin/OrderDetailsPage";
import OrderCreatePage from "./pages/Admin/OrderCreatePage";
import OrderEditPage from "./pages/Admin/OrderEditPage";
import EditUserPage from "./pages/Admin/EditUserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboardpage />} />
          <Route path="payments" element={<Paymentpage />} />
          <Route path="users" element={<Users />} />
          <Route path="users/edit/:userId" element={<EditUserPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/create" element={<OrderCreatePage />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="orders/edit/:orderId" element={<OrderEditPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="category/add" element={<AddCategoryPage />} />
          <Route path="category/addsub" element={<AddSubCategoryPage />} />
          <Route path="category/edit" element={<EditCategoryPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="category/editsub" element={<EditCategoryPage />} />
        </Route>
        {/* Add other routes like login if needed */}
      </Routes>
    </BrowserRouter>
  );
}
