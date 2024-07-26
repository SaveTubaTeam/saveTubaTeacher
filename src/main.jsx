import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/Account/AccountPage';
import CreateAssignment from './pages/CreateAssignment/CreateAssignment';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/Login/LoginPage';
import AlternativeLogin from './pages/Login/AlternativeLogin';
import AlternativeRegistration from './pages/Login/AlternativeRegistration';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import ClassSelection from './pages/ClassSelection/ClassSelection';
import "../translations/i18n";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'alt-login',
        element: <AlternativeLogin />
      },
      {
        path: 'alt-registration',
        element: <AlternativeRegistration />
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'class-selection',
            element: <ClassSelection />,
          },
          {
            path: 'dashboard/:classCode',
            element: <Dashboard />,
          },
          {
            path: 'create-assignment/:classCode',
            element: <CreateAssignment />,
          },
          {
            path: 'account',
            element: <AccountPage page="profile" />,
          },
          {
            path: 'contact-support',
            element: <AccountPage page="support" />
          },
        ]
      }
    ]
  }
]);

// React.StrictMode see: https://react.dev/reference/react/StrictMode
// NOTE: StrictMode causes all useEffects to run twice in development
// @jac927 07/23/24 | turned off React.StrictMode cuz it was annoying

// Provider (global redux config) see: https://react-redux.js.org/api/provider
// ToastContainer see: https://fkhadra.github.io/react-toastify/api/toast-container

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>

      <RouterProvider router={router} />

      <ToastContainer 
        position="top-center"
        autoClose={1500}
        closeButton={true}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />

    </Provider>
  </>
);
