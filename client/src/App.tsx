import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="password-reset/:id/:productId" element={<PasswordReset />} />
          <Route path="password-reset" element={<RequestPasswordReset />} />
          <Route path="search" element={<SearchField />} />
          <Route path="account">
            <Route path="details" element={<AccountDetails />} />
            <Route path="security" element={<AccountSecurity />} />
          </Route>
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
