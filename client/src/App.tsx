import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthContext from './hooks/useAuthContext';
import Layout from './components/Layout';
import New3aweniGoal from './pages/create-3aweni/New3aweniGoal';
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
import AccountDashboard from './pages/user-dashboard/AccountDashboard';
import DashboardMessages from './pages/user-dashboard/DashboardMessages';
import DashboardDonations from './pages/user-dashboard/DashboardDonations';

function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="password-reset/:id/:productId" element={user ? <Navigate to="/" /> : <PasswordReset />} />
          <Route path="password-reset" element={user ? <Navigate to="/" /> : <RequestPasswordReset />} />
          <Route path="search" element={<SearchField />} />
          <Route path="account">
            <Route path="details" element={user ?  <AccountDetails /> : <Navigate to="/login" />} />
            <Route path="security" element={user ? <AccountSecurity /> : <Navigate to="/login" />} />
          </Route>
        </Route> 
        <Route path="/account/dashboard" element={<AccountDashboard />} />
        <Route path="/dashboard/messages" element={<DashboardMessages />} />
        <Route path="/dashboard/donations" element={<DashboardDonations />} />
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
