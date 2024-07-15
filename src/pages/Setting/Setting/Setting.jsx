import React, { useState } from 'react';
import { Modal, List, Button } from 'antd';
import Setting from '../../../components/Setting/Setting'
const Settings = ({ open, onOk, onCancel }) => {
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
