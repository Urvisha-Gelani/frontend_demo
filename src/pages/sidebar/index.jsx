// src/components/sidebar/Sidebar.tsx
import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="app-sidebar">
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashboard/jobs"
          active={location.pathname === "/dashboard/jobs"}
          className="sidebar-link"
        >
          Job Details
        </Nav.Link>
        {/* <Nav.Link
          as={Link}
          to="applications"
          active={location.pathname === "applications"}
          className="sidebar-link"
        >
          My Applications
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="profile"
          active={location.pathname === "profile"}
          className="sidebar-link"
        >
          Profile
        </Nav.Link> */}
      </Nav>
    </div>
  );
};

export default Sidebar;
