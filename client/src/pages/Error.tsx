import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Error() {
  return (
    <>
        <Header />
        <main className="grid min-h-[70vh] place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
            <p className="font-semibold text-secondary_color text-5xl">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to='/' className="rounded-md bg-secondary_color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-main_color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary_color">Go back home</Link>
            <Link to='' className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></Link>
            </div>
        </div>
        </main>
        <Footer />
    </>
  )
}