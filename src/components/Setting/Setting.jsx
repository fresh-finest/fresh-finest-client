// App.js
import React, { useState } from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import ManageUser from '../../pages/Setting/User/ManageUser';

const { Sider, Content } = Layout;

const items = [
  { key: '1', icon: <PieChartOutlined />, label: 'General' },
  { key: '2', icon: <DesktopOutlined />, label: 'Billing' },
  { key: '3', icon: <ContainerOutlined />, label: 'Users & Permissions' },
  { key: '4', icon: <PieChartOutlined />, label: 'Options1' },
  { key: '5', icon: <DesktopOutlined />, label: 'Options2' },
  { key: '6', icon: <ContainerOutlined />, label: 'Options3' },
  { key: '7', icon: <PieChartOutlined />, label: 'Options4' },
  { key: '8', icon: <DesktopOutlined />, label: 'Options5' },
  { key: '9', icon: <ContainerOutlined />, label: 'Options6' },
];

const App = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const renderContent = () => {
    switch (selectedKey) {
      case '3':
        return <ManageUser />;
      default:
        return <div>Content goes here</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '90vh', display: 'flex', justifyContent: 'center' }}>
      <Layout style={{ width: '85%', display: 'flex', flexDirection: 'row' }}>
        <Sider style={{ background: '#fff', width: '300px' }}>
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="light"
            items={items}
            style={{
              height: 'calc(90vh - 64px)',
              borderRight: 0,
              overflow: 'hidden',
            }}
            onClick={({ key }) => setSelectedKey(key)}
          />
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              borderTop: '1px solid #f0f0f0',
            }}
          ></div>
        </Sider>
        <Content style={{ padding: '20px', flex: 1 }}>
          <div style={{ padding: 24, minHeight: 360 }}>{renderContent()}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
