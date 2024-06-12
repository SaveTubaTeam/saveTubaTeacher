import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import CreateAssignment from './pages/CreateAssignment.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    errorElement: <ErrorPage />
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/createassignment',
    element: <CreateAssignment/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
