import React, { Children } from "react";

import { FaChartPie } from "react-icons/fa";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { GoContainer } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { AiOutlineAppstore } from "react-icons/ai";

// We will set here icon in MenuItems functions, like
//  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },

const MenuItems = [
  { key: "1", icon: <FaChartPie />, label: "Option1" },
  { key: "2", icon: <MdOutlineDesktopWindows />, label: "Option2" },
  { key: "3", icon: <GoContainer />, label: "Options3" },
  {
    key: "sub1",
    label: "Navigation Two",
    icon: <CiMail/>,
    children:[
      {key: '5', label: 'Option 5'},
      {key: '6', label: 'Option 6'},
      {key: '7', label: 'Option 7'},
      {key: '8', label: 'Option 8'},
    ]

  },

  {
    key:'sub2',
    label:'Navigation Two',
    icon: <AiOutlineAppstore/>,
    children:[
      {key: '9', label: 'Option 9'},
      {key: '10', label: 'Option 10'},
      {
        key:'sub3',
        label:'Submenu',
        children:[
          {key: '11', label: 'Option 11'},
          {key: '12', label: 'Option 12'},
        ]
      }
    ]
  }
];

export default function Dashboard() {
  return <div>Dashboard</div>;
}
