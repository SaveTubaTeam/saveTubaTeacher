import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../../firebase";

//please see: https://github.com/remix-run/react-router/issues/10637
//this solution was taken from the answer provided by @jheisondev: https://github.com/remix-run/react-router/issues/10637#issuecomment-1802180978
function ProtectedRoutes() {
	const location = useLocation(); //see: https://reactrouter.com/en/main/hooks/use-location
	let authStatus = false;

	if(auth.currentUser) {
		authStatus = true;
	} else {
		console.error(`\tERROR: unauthorized user tried to access ${location.pathname}`);
	}

	return authStatus ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;