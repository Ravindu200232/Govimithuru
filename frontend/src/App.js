import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// User-facing components
import Navbar from './Components/ui/Navbar';
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

function App() {
  return (


    

    <Router>
      <div>
        {/* User-facing routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Poster />
                <Offer />
                <CropSolution />
                <BestSeller />
                <Footer />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/seeds" element={<Seeds />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/cart" element={<Card />} />
        </Routes>

        {/* Admin-facing routes */}
        <Routes>
          <Route
            path="/admin/inventory"
            element={
              <>
              <NavbarA/>
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
               <NavbarA/>
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
               <NavbarA/>
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <AllInventory />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/cart"
            element={
              <>
               <NavbarA/>
                <div className="main-content">
                  <CartSidebar />
                  <div className="content">
                    <CardDashboard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <>
               <NavbarA/>
                <div className="main-content">
                  <OrderSide />
                  <div className="content">
                    <OrderDashboard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/delivery"
            element={
              <>
               <NavbarA/>
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
            path="/admin/customers"
            element={
              <>
               <NavbarA/>
                <div className="main-content">
                  <UserSide />
                  <div className="content">
                    <UserDashboard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/admin/finance"
            element={
              <>
               <NavbarA/>
                <div className="main-content">
                  <FinanceSidebar />
                  <div className="content">
                    <FinanceDashboard />
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
