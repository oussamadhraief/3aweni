import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import New3aweni from './pages/create-3aweni/New3aweni';
import Home from './pages/Home';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Register from './pages/Register';
import RequestPasswordReset from './pages/RequestPasswordReset';

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
        </Route>
        <Route path="new3aweni" element={<New3aweni />} />
        <Route path="*" element={<div>error</div>} />
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
