// App.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavbarComponents/NavigationBar';

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
