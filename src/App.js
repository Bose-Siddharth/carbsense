import React from 'react';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Monitor from './Pages/Monitor';
// import UserRegistration from './Pages/Admin/UserRegistration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Utils/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/" exact element={<PrivateRoutes />}>
          <Route path="/" exact element={<Dashboard />} />
          {/* <Route path="user-register" element={<UserRegistration />} /> */}
          <Route path="monitor" element={<Monitor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
