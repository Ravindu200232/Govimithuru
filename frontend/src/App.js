import React, { useState } from 'react'; // Import useState
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// User-facing components
import Navbar from './Components/ui/Navbarui';
import Banner from './Components/ui/Banner';
import Poster from './Components/ui/Poster';
import BestSeller from './Components/ui/BestSelling';
import Offer from './Components/ui/Offers';
import CropSolution from './Components/ui/CropSolution';
import Footer from './Components/ui/Footer';
import Seeds from './Components/ui/Seeds';
import Description from './Components/ui/Description';
import Products from './Components/ui/Product';
import Card from './Components/ui/Card';

// Admin-facing components
import NavbarA from './Components/inventry/NavbarA';
import SidebarA from './Components/inventry/SidebarA';
import InventoryDashboard from './Components/inventry/InventoryDashboard';
import InventorySupplyForm from './Components/inventry/InventorySupplyform';
import AllInventory from './Components/inventry/AllInventory';
import OrderDashboard from './Components/Order/OrderDashboard';
import DeliveryDashboard from './Components/Deliver/Deliveries';
import CardDashboard from './Components/Card/CartDashborad';
import UserDashboard from './Components/User/UserDashboard';
import FinanceDashboard from './Components/finance/FinanceDashboard';
import CartSidebar from './Components/Card/SidebarA';
import DileverySidebar from './Components/Deliver/SidebarA';
import FinanceSidebar from './Components/finance/SidebarA';
import OrderSide from './Components/Order/SidebarA';
import UserSide from './Components/User/SidebarA';
import ShowcaseForm from './Components/inventry/ShowcaseForm';
import ShowcaseDashboard from './Components/inventry/ShowcaseDashboard';
import EmployeeList from './Components/Employee/EmployeeList';
import EmployeeForm from './Components/Employee/EmployeeForm';
import SidebarE from './Components/Employee/SidebarE';
import EmployeeSalaryForm from './Components/Employee/EmployeeSalaryForm';
import SalaryDashboard from './Components/Employee/SalaryDashboard';
import OrderSummary from './Components/ui/OrderSummary';
import DriverList from './Components/Deliver/DriverList';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      <div>
        {/* User-facing routes with shared Navbar and Footer */}
        <Routes>
          {/* User-facing routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Banner />
                <Poster />
                <Offer />
                <CropSolution />
                <BestSeller />
                <Footer />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <Products />
                <Footer />
              </>
            }
          />
          <Route
            path="/seeds"
            element={
              <>
                <Navbar />
                <Seeds />
                <Footer />
              </>
            }
          />
          <Route
            path="/description/:id"
            element={
              <>
                <Navbar />
                <Description />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <Card />
                <Footer />
              </>
            }
          />
           <Route
            path="/order-summary"
            element={
              <>
                <Navbar />
                <OrderSummary />
                <Footer />
              </>
            }
          />
        </Routes>

        {/* Admin-facing routes */}
        <Routes>
          {/* Inventory routes */}
          <Route
            path="/admin/inventory"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <InventoryDashboard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/inventory/supply-form"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <InventorySupplyForm />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/inventory/all"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <AllInventory />
                  </div>
                </div>
              </>
            }
          />

          {/* Cart routes */}
          <Route
            path="/admin/cart"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <CartSidebar />
                  <div className="content">
                    <CardDashboard />
                  </div>
                </div>
              </>
            }
          />

          {/* Order routes */}
          <Route
            path="/admin/orders"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <OrderSide />
                  <div className="content">
                    <OrderDashboard />
                  </div>
                </div>
              </>
            }
          />

          {/* Delivery routes */}
          <Route
            path="/admin/delivery"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <DileverySidebar />
                  <div className="content">
                    <DeliveryDashboard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/driver"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                <DileverySidebar />
                  <div className="content">
                    <DriverList />
                  </div>
                </div>
              </>
            }
          />



          {/* Customer management routes */}
          <Route
            path="/admin/customers"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <UserSide />
                  <div className="content">
                    <UserDashboard />
                  </div>
                </div>
              </>
            }
          />

          {/* Finance routes */}
          <Route
            path="/admin/finance"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <FinanceSidebar />
                  <div className="content">
                    <FinanceDashboard />
                  </div>
                </div>
              </>
            }
          />

          {/* Showcase routes */}
          <Route
            path="/admin/showcase"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <ShowcaseDashboard />
                  </div>
                </div>
              </>
            }
          />

          {/* ShowcaseForm route with sidebar toggle */}
          <Route
            path="/admin/showcase/ShowcaseForm"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  {sidebarVisible && <SidebarA />}
                  <button onClick={toggleSidebar} className="sidebar-toggle-btn">
                    {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
                  </button>
                  <div className={`content ${sidebarVisible ? 'with-sidebar' : 'without-sidebar'}`}>
                    <ShowcaseForm />
                  </div>
                </div>
              </>
            }
          />

          {/* Employee routes */}
          <Route
            path="/admin/employee"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <EmployeeList />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/employee/form"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <EmployeeForm />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/employee/salary-form"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <EmployeeSalaryForm />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/employee/salary-dashboard"
            element={
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <SalaryDashboard />
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
