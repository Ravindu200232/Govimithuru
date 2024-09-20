import React, { useState, useEffect } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
import GrowthPromoters from './Components/ui/GrowthPromoters';
import Remedies from './Components/ui/Remedies';
import OrganicFarming from './Components/ui/OrganicFarming';
import Equipments from './Components/ui/Equipments';
import Fertilizers from './Components/ui/Fertilizers';
import Irrigation from './Components/ui/Irrigation';
import Gardening from './Components/ui/Gardening';
import Card from './Components/ui/Card';
import OrderSummary from './Components/ui/OrderSummary';
import OrderConfirmation from './Components/ui/OrderConfirmation';
import Contact from './Components/ui/contact';
import About from './Components/ui/About';
import Signup from './Signup';
import Login from './Login';
import AdminLogin from './AdminLogin';


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
import DriverList from './Components/Deliver/DriverList';
import PaymentDashboard from './Components/payment/PaymentDashboard';
import PaymentSidebar from './Components/payment/PaymentSidebar';
import OfferForm from './Components/inventry/OfferForm';
import CropSolutionForm from './Components/inventry/CropSolutionForm';
import BestSellingForm from './Components/inventry/BestSellingForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedInUser = Cookies.get('isLoggedIn') === 'true';
    const adminUser = Cookies.get('isAdmin') === 'true';
    setIsLoggedIn(loggedInUser);
    setIsAdmin(adminUser);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', 'true', { expires: 1 / 288 });
    alert("Logged in successfully!");
  };

  const handleAdminLogin = (email, password) => {
    if (email === 'admin2232@gmail.com' && password === 'R2232r#') {
      setIsAdmin(true);
      Cookies.set('isAdmin', 'true', { expires: 1 / 288 });
      alert("Admin logged in successfully!");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    Cookies.remove('isLoggedIn');
    Cookies.remove('isAdmin');
    alert("Logged out due to inactivity!");
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />

          {/* User-facing routes */}
          <Route path="/home" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Banner />
                <Poster />
                <Offer />
                <CropSolution />
                <BestSeller />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/products" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Products />
                <Footer />
              </>
            ) : (
              <Navigate to="/products" />
            )
          } />
          <Route path="/seeds" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Seeds />
                <Footer />
              </>
            ) : (
              <Navigate to="/seeds" />
            )
          } />
          <Route path="/growthPromoters" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <GrowthPromoters />
                <Footer />
              </>
            ) : (
              <Navigate to="/growthPromoters" />
            )
          } />
          <Route path="/remedies" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Remedies />
                <Footer />
              </>
            ) : (
              <Navigate to="/remedies" />
            )
          } />
          <Route path="/organicFarming" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <OrganicFarming />
                <Footer />
              </>
            ) : (
              <Navigate to="/organicFarming" />
            )
          } />
          <Route path="/equipments" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Equipments />
                <Footer />
              </>
            ) : (
              <Navigate to="/equipments" />
            )
          } />
          <Route path="/fertilizers" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Fertilizers />
                <Footer />
              </>
            ) : (
              <Navigate to="/fertilizers" />
            )
          } />
          <Route path="/irrigation" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Irrigation />
                <Footer />
              </>
            ) : (
              <Navigate to="/irrigation" />
            )
          } />
          <Route path="/gardening" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Gardening />
                <Footer />
              </>
            ) : (
              <Navigate to="/gardening" />
            )
          } />
          <Route path="/description/:id" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Description />
                <Footer />
              </>
            ) : (
              <Navigate to="/description" />
            )
          } />
          <Route path="/cart" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Card />
                <Footer />
              </>
            ) : (
              <Navigate to="/cart" />
            )
          } />

            <Route path="/contact" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            ) : (
              <Navigate to="/contact" />
            )
          } />


          <Route path="/order-summary" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <OrderSummary />
                <Footer />
              </>
            ) : (
              <Navigate to="/order-summary" />
            )
          } />
          <Route path="/confirmation/:orderId" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <OrderConfirmation />
                <Footer />
              </>
            ) : (
              <Navigate to="/confirmation/:orderId" />
            )
          } />
          <Route path="/about" element={
            isLoggedIn ? (
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            ) : (
              <Navigate to="/about" />
            )
          } />

          {/* Admin-facing routes */}
          <Route path="/admin/inventory" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <InventoryDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/inventory/supply-form" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <InventorySupplyForm />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/inventory/all" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <AllInventory />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/cart" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <CartSidebar />
                  <div className="content">
                    <CardDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/orders" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <OrderSide />
                  <div className="content">
                    <OrderDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/delivery" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <DileverySidebar />
                  <div className="content">
                    <DeliveryDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/finance" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <FinanceSidebar />
                  <div className="content">
                    <FinanceDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/customers" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <UserSide />
                  <div className="content">
                    <UserDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/employee" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <EmployeeList />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/employee/form" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <EmployeeForm />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/employee/salary-dashboard" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <SalaryDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/employee/salary-form" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarE />
                  <div className="content">
                    <EmployeeSalaryForm />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/driver" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <DileverySidebar />
                  <div className="content">
                    <DriverList />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/showcase" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <ShowcaseDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/showcase/form" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <ShowcaseForm />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />

            <Route path="/admin/payment" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <PaymentSidebar />
                  <div className="content">
                    <PaymentDashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />

            <Route path="/admin/offer" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <OfferForm />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />

           <Route path="/admin/cropsolution" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <CropSolutionForm />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
          <Route path="/admin/bestseller" element={
            isAdmin ? (
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <BestSellingForm />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/admin/login" />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
