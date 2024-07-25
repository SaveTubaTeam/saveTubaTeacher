import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

function ProtectedRoutes() {
	let authStatus = false;
	if(auth.currentUser) {
		authStatus = true;
	}

	return authStatus ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;