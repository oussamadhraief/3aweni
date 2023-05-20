import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthContext';
import Layout from './components/Layout';
import New3aweniGoal from './pages/create-3aweni/New3aweniTitleGoal';
import New3aweniCategoryLocation from './pages/create-3aweni/New3aweniCategoryLocation';
import New3aweniRegister from './pages/create-3aweni/New3aweniRegister';
import New3aweniLogin from './pages/create-3aweni/New3aweniLogin';
import New3aweniType from './pages/create-3aweni/New3aweniType';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Register from './pages/Register';
import RequestPasswordReset from './pages/RequestPasswordReset';
import Error from './pages/Error';
import SearchField from './pages/search/SearchField';
import DashboardLayout from './components/DashboardLayout';
import DashboardFundraisers from './pages/account/dashboard/DashboardFundraisers';
import DashboardSettings from './pages/account/dashboard/DashboardSettings';
import DashboardMessages from './pages/account/dashboard/DashboardMessages';
import DashboardDonationsSent from './pages/account/dashboard/DashboardDonationsSent';
import DashboardReceivedDonations from './pages/account/dashboard/DashboardReceivedDonations';
import SingleFundraiser from './pages/fundraisers/SingleFundraiser';
import EditUserFundraiser from './pages/account/dashboard/edit-fundraiser/EditUserFundraiser';
import DashboardStats from './pages/account/dashboard/DashboardStats';
import CategoryFundraisers from './pages/fundraisers/CategoryFundraisers';
import("@lottiefiles/lottie-player");
// const { io } = require("socket.io-client");

// const socket = io();


function App() {
  
  const { user, loading } = useAuthContext()
  
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={loading ? null : user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={loading ? null :  user ? <Navigate to="/" /> : <Register />} />
          <Route path="password-reset/:id/:productId" element={loading ? null :  user ? <Navigate to="/" /> : <PasswordReset />} />
          <Route path="password-reset" element={loading ? null :  user ? <Navigate to="/" /> : <RequestPasswordReset />} />
          <Route path="search" element={<SearchField />} />
          <Route path="fundraisers/:id" element={<SingleFundraiser />} />
          <Route path="donate/:id" element={<Donate />} />
          <Route
                path="/discover/:category"
                element={!loading ? <CategoryFundraisers /> : null}
              />
        </Route> 
        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="stats"  element={!loading ?  (user ?  <DashboardStats /> : <Navigate to="/login" />) : null} />
            <Route path="fundraisers">
              <Route index element={!loading ?  (user ?  <DashboardFundraisers /> : <Navigate to="/login" />) : null} />
              <Route path=":id"  element={!loading ?  (user ?  <EditUserFundraiser /> : <Navigate to="/login" />) : null} />
            </Route> 
            <Route path="messages"  element={!loading ?  (user ?  <DashboardMessages /> : <Navigate to="/login" />) : null} />
            <Route path="my-donations"  element={!loading ?  (user ?  <DashboardDonationsSent /> : <Navigate to="/login" />) : null} />
            <Route path="received-donations"  element={!loading ?  (user ?  <DashboardReceivedDonations /> : <Navigate to="/login" />) : null} />
            <Route path="settings"  element={!loading ?  (user ?  <DashboardSettings /> : <Navigate to="/login" />) : null} />
            <Route path="fundraisers/:id" element={<SingleFundraiser />} />
        </Route> 
        <Route path="create">
          <Route path="category" element={<New3aweniCategoryLocation />} />
          <Route path="type" element={<New3aweniType />} />
          <Route path="goal" element={<New3aweniGoal />} />
          <Route path="register" element={<New3aweniRegister />} />
          <Route path="login" element={<New3aweniLogin />} />
        </Route>
        <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
