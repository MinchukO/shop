import React, { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages'
import { ErrorElement, Loading } from './components'
import { loader as loaderLanding } from './pages/Landing'
import { loader as loaderSinglePage } from './pages/SingleProduct'
import { loader as loaderProducts } from './pages/Products'
import { loader as loaderOrder } from './pages/Orders'
import { loader as loaderCheckout } from './pages/Checkout'

import { action as actionRegister } from './pages/Register';
import { action as actionLogin } from './pages/Login'

import {store} from './store'

const HomeLayout = React.lazy(() => import('./pages/HomeLayout'))


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <HomeLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          loader: loaderLanding,
        },
        {
          path: 'products',
          element: <Products />,
          loader: loaderProducts,
          errorElement: <ErrorElement />,
        },
        {
          path: 'products/:id',
          element: <SingleProduct />,
          errorElement: <ErrorElement />,
          loader: loaderSinglePage,
        },
        {
          path: 'cart',
          element: <Cart />,
        },
        {
          path: 'checkout',
          element: <Checkout />,
          loader: loaderCheckout(store),
        },
        {
          path: 'orders',
          element: <Orders />,
          loader: loaderOrder(store),
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
      action: actionLogin(store),
      errorElement: <Error />,
    },
    {
      path: '/register',
      element: <Register />,
      action: actionRegister,
      errorElement: <Error />,
    },
  ],
  { basename: import.meta.env.VITE_PUBLIC_URL },
)

function App() {
  return (
    <RouterProvider router={router}/>
  )
}
export default App
