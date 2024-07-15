import React from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';

const { Sider, Content } = Layout;

const items = [
  { key: '1', icon: <PieChartOutlined />, label: 'General' },
  { key: '2', icon: <DesktopOutlined />, label: 'Billing' },
  { key: '3', icon: <ContainerOutlined />, label: 'Users' },
  { key: '4', icon: <PieChartOutlined />, label: 'options1' },
  { key: '5', icon: <DesktopOutlined />, label: 'Options2' },
  { key: '6', icon: <ContainerOutlined />, label: 'Options3' },
  { key: '7', icon: <PieChartOutlined />, label: 'Options4' },
  { key: '8', icon: <DesktopOutlined />, label: 'Options5' },
  { key: '9', icon: <ContainerOutlined />, label: 'Options6' },
];

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#fff' }}>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="light"
          items={items}
          style={{
            height: 'calc(100vh - 64px)',
            borderRight: 0,
            overflow: 'hidden',
          }}
        />
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            borderTop: '1px solid #f0f0f0',
          }}
        ></div>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>Content goes here</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
