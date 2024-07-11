import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    designation: '',
    role: 'admin' // Default role
  });
  const [loading, setLoading] = useState(false);

  const baseUrl = useSelector((state) => state.baseUrl.baseUrl); // Get the base URL from Redux

  console.log("baseurl"+baseUrl);
  const getData = async () => {
    try {
      const response = await axios.get(`https://fresh-finest-server-dd57784051b3.herokuapp.com/api/user`);
      const usersWithDefaultPermissions = response.data.result.map((user) => ({
        ...user,
        permissions: user.permissions || {
          create: false,
          read: false,
          write: false,
          update: false,
          delete: false,
          analysis: false,
        },
      }));
      setUsers(usersWithDefaultPermissions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [baseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://fresh-finest-server-dd57784051b3.herokuapp.com//api/user`, formData);
      setFormData({
        userName: '',
        email: '',
        password: '',
        designation: '',
        role: 'admin', // Reset to default role
      });
      getData(); // Refresh data after adding new user
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handlePermissionChange = async (userId, permission, value) => {
    setLoading(true);
    const updatedUsers = users.map((user) =>
      user._id === userId
        ? { ...user, permissions: { ...user.permissions, [permission]: value } }
        : user
    );
    setUsers(updatedUsers);

    try {
      const user = updatedUsers.find((user) => user._id === userId);
      await axios.put(`https://fresh-finest-server-dd57784051b3.herokuapp.com/api/user/${userId}`, {
        role: user.role,
        permissions: user.permissions,
      });
    } catch (error) {
      console.error('Error updating permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://fresh-finest-server-dd57784051b3.herokuapp.com/api/user/${userId}`);
        getData(); // Refresh data after deleting user
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col className="text-center">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New User
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Add User
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Row>
        <Col>
          <h2 className="text-center mb-3">All Users</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.userName}</td>
                    <td>{user.role}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Form.Check
                          type="checkbox"
                          label="Read"
                          checked={user.permissions.read}
                          onChange={(e) => handlePermissionChange(user._id, 'read', e.target.checked)}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Write"
                          checked={user.permissions.write}
                          onChange={(e) => handlePermissionChange(user._id, 'write', e.target.checked)}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Update"
                          checked={user.permissions.update}
                          onChange={(e) => handlePermissionChange(user._id, 'update', e.target.checked)}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Delete"
                          checked={user.permissions.delete}
                          onChange={(e) => handlePermissionChange(user._id, 'delete', e.target.checked)}
                        />
                       
                      </div>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteUser(user._id)} disabled={loading}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
