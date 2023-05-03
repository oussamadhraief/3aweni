import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthContext from './hooks/useAuthContext';
import Layout from './components/Layout';
import New3aweniGoal from './pages/create-3aweni/New3aweniTitleGoal';
import New3aweniCategoryLocation from './pages/create-3aweni/New3aweniCategoryLocation';
import New3aweniRegister from './pages/create-3aweni/New3aweniRegister';
import New3aweniLogin from './pages/create-3aweni/New3aweniLogin';
import New3aweniType from './pages/create-3aweni/New3aweniType';
import Home from './pages/Home';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Register from './pages/Register';
import RequestPasswordReset from './pages/RequestPasswordReset';
import Error from './pages/Error';
import SearchField from './pages/search/SearchField';
import AccountDetails from './pages/account/AccountDetails';
import AccountSecurity from './pages/account/AccountSecurity';
import UserDashboardLayout from './components/UserDashboardLayout';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import useLoadingAuthContext from './hooks/useLoadingAuthContext';
import DashboardFundraisers from './pages/account/dashboard/DashboardFundraisers';
import DashboardSettings from './pages/account/dashboard/DashboardSettings';
import DashboardMessages from './pages/account/dashboard/DashboardMessages';
import DashboardDonations from './pages/account/dashboard/DashboardDonations';
import SingleFundraiser from './pages/fundraisers/SingleFundraiser';
import EditUserFundraiser from './pages/account/dashboard/edit-fundraiser/EditUserFundraiser';
import AdminAnalytics from './pages/admin/AdminAnalytics';
const { io } = require("socket.io-client");

const socket = io();
console.log(socket);


function App() {
  
  const { user } = useAuthContext()
  const { Loading } = useLoadingAuthContext()
  
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={Loading ? null : user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={Loading ? null :  user ? <Navigate to="/" /> : <Register />} />
          <Route path="password-reset/:id/:productId" element={Loading ? null :  user ? <Navigate to="/" /> : <PasswordReset />} />
          <Route path="password-reset" element={Loading ? null :  user ? <Navigate to="/" /> : <RequestPasswordReset />} />
          <Route path="search" element={<SearchField />} />
          <Route path="fundraisers/:id" element={<SingleFundraiser />} />
          <Route path="account">
            <Route path="details" element={Loading ? null :  user ?  <AccountDetails /> : <Navigate to="/login" />} />
            <Route path="security" element={Loading ? null :  user ? <AccountSecurity /> : <Navigate to="/login" />} />
          </Route>
        </Route> 
        <Route path="account/dashboard" element={<UserDashboardLayout />}>
            <Route path="fundraisers">
              <Route index element={!Loading ?  (user ?  <DashboardFundraisers /> : <Navigate to="/login" />) : null} />
              <Route path=":id"  element={!Loading ?  (user ?  <EditUserFundraiser /> : <Navigate to="/login" />) : null} />
            </Route> 
            <Route path="messages"  element={!Loading ?  (user ?  <DashboardMessages /> : <Navigate to="/login" />) : null} />
            <Route path="donations"  element={!Loading ?  (user ?  <DashboardDonations /> : <Navigate to="/login" />) : null} />
            <Route path="settings"  element={!Loading ?  (user ?  <DashboardSettings /> : <Navigate to="/login" />) : null} />
            <Route path="fundraisers/:id" element={<SingleFundraiser />} />
        </Route> 
        <Route path="create">
          <Route path="category" element={<New3aweniCategoryLocation />} />
          <Route path="type" element={<New3aweniType />} />
          <Route path="goal" element={<New3aweniGoal />} />
          <Route path="register" element={<New3aweniRegister />} />
          <Route path="login" element={<New3aweniLogin />} />
        </Route>
        <Route path="admin/dashboard" element={<AdminDashboardLayout />}>
            <Route index  element={!Loading ?  (user ?  <AdminAnalytics /> : <Navigate to="/login" />) : null} />
            <Route path="fundraisers">
              <Route index element={!Loading ?  (user ?  <DashboardFundraisers /> : <Navigate to="/login" />) : null} />
              <Route path=":id"  element={!Loading ?  (user ?  <EditUserFundraiser /> : <Navigate to="/login" />) : null} />
            </Route> 
            <Route path="messages"  element={!Loading ?  (user ?  <DashboardMessages /> : <Navigate to="/login" />) : null} />
            <Route path="donations"  element={!Loading ?  (user ?  <DashboardDonations /> : <Navigate to="/login" />) : null} />
            <Route path="settings"  element={!Loading ?  (user ?  <DashboardSettings /> : <Navigate to="/login" />) : null} />
            <Route path="fundraisers/:id" element={<SingleFundraiser />} />
        </Route> 
        <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
