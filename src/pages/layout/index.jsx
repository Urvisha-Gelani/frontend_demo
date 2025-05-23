// src/components/layout/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../zustand-store/auth/auth.store";
import Header from "../header";
import Sidebar from "../sidebar";

const Layout = () => {
  const { authToken } = useAuthStore();

  return (
    <div className="layout">
      {authToken && <Header />}

      <div className="main-content">
        {authToken && <Sidebar />}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
