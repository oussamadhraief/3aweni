import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useLoadingAuthContext from "../hooks/useLoadingAuthContext";
import useAuthContext from "../hooks/useAuthContext";
import getUser from "../hooks/getUser";

export default function Layout() {
  const location = useLocation();

  const { login, logout } = useAuthContext();
  const { Loading, setLoading } = useLoadingAuthContext();

  useEffect(() => {
    getUser({ login, logout, setLoading });
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
      {!Loading && <Footer />}
    </>
  );
}
