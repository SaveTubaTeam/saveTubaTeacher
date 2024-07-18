import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile/Profile';
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
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'createassignment',
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
        path: 'classselection',
        element: <ClassSelection />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
