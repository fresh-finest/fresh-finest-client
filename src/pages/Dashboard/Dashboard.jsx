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

import AllProducts from "../Product/AllProducts";
import Settings from "../Setting/Setting/Setting";

import companyLogo from '../../assets/images/toplogo.png';
import Keyword from "../Keyword/Keyword";
import SingleProduct from "../Product/SingleProduct";

const menuItems = [
  { key: "1", icon: <FaChartPie />, label: "Option1" },
  { key: "2", icon: <MdOutlineDesktopWindows />, label: "Option2" },
  { key: "3", icon: <GoContainer />, label: "Keywords" },
  {
    key: "sub1",
    label: "Products",
    icon: <CiMail />,
    children: [
      { key: "5", label: "All products" },
      { key: "6", label: "Items" },
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
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleSettingsOk = () => {
    setIsSettingsModalOpen(false);
  };

  const handleSettingsCancel = () => {
    setIsSettingsModalOpen(false);
  };

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    if (selectedKey === "5") {
      return <AllProducts />;
    }else if(selectedKey ==="3"){
      return <Keyword/>
    }else if(selectedKey ==="6"){
      return <SingleProduct/>
    } else {
      return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "#969696",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={companyLogo} alt="Company Logo" style={{ height: "40px", width: "40px", marginRight: "10px" }} />
          <span style={{ fontSize: "25px", color: "#000000" }}>Fresh Finest</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
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
      </div>
      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: collapsed ? 80 : 256,
            backgroundColor: "#001529",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.2s",
            position: "fixed",
            top: 60,
            bottom: 0,
            zIndex: 1
          }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ flex: 1 }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
        <div style={{ flex: 1, padding: '20px', marginLeft: collapsed ? 80 : 256, overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
      <Settings
        open={isSettingsModalOpen}
        onOk={handleSettingsOk}
        onCancel={handleSettingsCancel}
      />
    </div>
  );
}
