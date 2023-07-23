import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export default function AdminSideBar(props) {
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const path = window.location.pathname.split("/")[2];

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar collapsed={isCollapsed} collapsedWidth="70px">
      <Menu
        menuItemStyles={{
          button: ({ active, disabled }) => {
            if (active)
              return {
                backgroundColor: "#1b4a79",
                color: "#b6c8d9",
              };
            return {
              color: disabled ? "#d4e9ff" : "#13395e",
              backgroundColor: active ? "#eecef9" : undefined,
            };
          },
        }}
      >
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={
            isCollapsed ? (
              <i className="admin-dashboard-toggle fa-solid fa-bars fa-xl"></i>
            ) : undefined
          }
          style={{
            margin: "10px 0 20px 0",
            background: "none",
          }}
        >
          {!isCollapsed && (
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3>ADMIN</h3>
              <div
                className="admin-dashboard-toggle"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <i className="fa-solid fa-bars fa-xl"></i>
              </div>
            </div>
          )}
        </MenuItem>

        <div className="mb-2 text-center">
          <div className="admin-dashboard-header ">
            <h5>{userInfo.name}</h5>
          </div>
        </div>
        <Link to="/admin/dashboard">
          <MenuItem
            active={path === "dashboard"}
            icon={<i className="fa-solid fa-house"></i>}
          >
            Dashboard
          </MenuItem>
        </Link>

        <div className="text-center my-3">
          <span className="text-secondary">Data</span>
        </div>
        <Link to="/admin/news">
          <MenuItem
            active={path === "news"}
            icon={<i className="fa-solid fa-receipt"></i>}
          >
            News
          </MenuItem>
        </Link>
        <Link to="/admin/users">
          <MenuItem
            active={path === "users"}
            icon={<i className="fa-solid fa-users"></i>}
          >
            Users
          </MenuItem>
        </Link>
        <div className="text-center my-3">
          <span className="text-secondary">Charts</span>
        </div>

        <MenuItem
          disabled
          active={path === "bar"}
          icon={<i className="fa-solid fa-chart-column"></i>}
        >
          Bar Chart
        </MenuItem>

        <MenuItem
          disabled
          active={path === "pie"}
          icon={<i className="fa-solid fa-chart-pie"></i>}
        >
          Pie Chart
        </MenuItem>

        <MenuItem
          disabled
          active={path === "line"}
          icon={<i className="fa-solid fa-chart-line"></i>}
        >
          Line Chart
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
