// src/Dashboard.js
import React, { useState } from "react";
import {
  FaChartPie,
  FaUserCircle,
} from "react-icons/fa";
import {
  MdOutlineDesktopWindows,
} from "react-icons/md";
import {
  GoContainer,
} from "react-icons/go";
import {
  CiMail,
  CiBellOn,
  CiSettings,
} from "react-icons/ci";
import {
  AiOutlineAppstore,
} from "react-icons/ai";
import {
  Button,
  Menu,
  Select,
} from "antd";
import ManageUser from "../Setting/User/ManageUser";
import AllProducts from "../Product/AllProducts";

const menuItems = [
  { key: "1", icon: <FaChartPie />, label: "Option1" },
  { key: "2", icon: <MdOutlineDesktopWindows />, label: "Option2" },
  { key: "3", icon: <GoContainer />, label: "Options3" },
  {
    key: "sub1",
    label: "Products",
    icon: <CiMail />,
    children: [
      { key: "5", label: "All products" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AiOutlineAppstore />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  const handleSettingsClick = () => {
    setSelectedKey("settings");
  };

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    if (selectedKey === "5") {
      return <AllProducts />;
    } else if (selectedKey === "settings") {
      return (
        <div>
          <h2>User Management</h2>
          <ManageUser />
        </div>
      );
    } else {
      return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "#1677FF",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <CiBellOn style={{ fontSize: "20px", marginRight: "20px" }} />

        <Select
          defaultValue="Account1"
          style={{ width: 150 }}
          options={[
            { value: "Account1", label: "Account 1" },
            { value: "Account2", label: "Account 2" },
            { value: "Account3", label: "Account 3" },
          ]}
        />
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: collapsed ? 80 : 256,
            backgroundColor: "#001529",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.2s",
          }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={menuItems}
            style={{ flex: 1 }}
            onClick={handleMenuClick}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Button
              icon={<CiSettings />}
              style={{ marginBottom: "10px" }}
              onClick={handleSettingsClick}
            />
            <Button icon={<FaUserCircle />} />
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
