import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import SmoothCorners from './components/layout/SmoothCorners';

const HomePage     = lazy(() => import('./pages/Home'));
const PLPPage      = lazy(() => import('./pages/PLP'));
const PDPPage      = lazy(() => import('./pages/PDP'));
const CartPage     = lazy(() => import('./pages/Cart'));
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const AccountPage  = lazy(() => import('./pages/Account'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,                element: <HomePage /> },
      { path: 'shop',               element: <PLPPage /> },
      { path: 'shop/:category',     element: <PLPPage /> },
      { path: 'product/:productId', element: <PDPPage /> },
      { path: 'cart',               element: <CartPage /> },
      { path: 'checkout',           element: <CheckoutPage /> },
      { path: 'account',            element: <AccountPage /> },
    ],
  },
]);

export default function App() {
  return (
    <SmoothCorners radius={20} className="app-frame">
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </SmoothCorners>
  );
}
