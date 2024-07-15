import React, { useState } from 'react';
import { Modal, List, Button } from 'antd';
import ManageUser from '../User/ManageUser'
import Setting from '../../../components/Setting/Setting'
const Settings = ({ open, onOk, onCancel }) => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  const settingsList = [
    { key: '1', title: 'Manage User', description: 'Description of setting 1' },
    { key: '2', title: 'Setting 2', description: 'Description of setting 2' },
    { key: '3', title: 'Setting 3', description: 'Description of setting 3' },
  ];

  const renderContent = () => {
    switch (selectedSetting) {
      case '1':
        return <div><ManageUser/></div>;
      case '2':
        return <div>Content for Setting 2</div>;
      case '3':
        return <div>Content for Setting 3</div>;
      default:
        return <div>Select a setting to see details.</div>;
    }
  };

  return (
    <Modal
      title="Settings"
      visible={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      width="100vw"
      style={{ top: 0, padding: 0 }}
      bodyStyle={{ height: '100vh', padding: 0, display: 'flex' }}
    >
    <Setting/>
    </Modal>
  );
};

export default Settings;
