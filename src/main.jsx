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
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import ClassSelection from './pages/ClassSelection/ClassSelection';

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
        path: 'dashboard/:classCode',
        element: <Dashboard />,
      },
      {
        path: 'account',
        element: <AccountPage page="account" />,
      },
      {
        path: 'support',
        element: <AccountPage page="support" />
      },
      {
        path: 'create-assignment/:classCode',
        element: <CreateAssignment />,
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
        path: 'class-selection',
        element: <ClassSelection />,
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
