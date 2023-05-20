import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import getUser from '../hooks/getUser'

export default function Layout() {

  const location = useLocation()

  const { login, logout, loading, setLoading } = useAuthContext()

  useEffect(() => {
    getUser({ login, logout, setLoading })
  },[location])

  return (
    <>
        <Header />
        <Outlet />
        {!loading && <Footer />}
    </>
  )
}
