import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

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
        path: 'class-selection',
        element: <ClassSelection />,
      }
    ]
  }
]);

//ToastContainer see: https://fkhadra.github.io/react-toastify/api/toast-container
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
