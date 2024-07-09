import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col, Card } from 'react-bootstrap';

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    designation: '',
    role: 'admin' // Default role
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingRole, setEditingRole] = useState('');

  const getData = async () => {
    const response = await fetch(`http://localhost:5000/api/user`, {
      method: "GET",
      //  headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data.result);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user', formData);
      setFormData({
        userName: '',
        email: '',
        password: '',
        designation: '',
        role: 'admin' // Reset to default role
      });
      getData(); // Refresh data after adding new user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditRole = (userId) => {
    setEditingUserId(userId);
    const user = users.find(user => user._id === userId);
    setEditingRole(user.role);
  };

  const handleRoleChange = (e) => {
    setEditingRole(e.target.value);
  };

  const handleSaveRole = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, { role: editingRole });
      setEditingUserId(null);
      setEditingRole('');
      getData(); // Refresh data after updating role
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>Add New User</Card.Title>
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
                <Button variant="primary" type="submit">
                  Add User
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center mb-3">All Users</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.userName}</td>
                    <td>{editingUserId === user._id ? (
                      <Form.Select
                        value={editingRole}
                        onChange={handleRoleChange}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="analyst">Analyst</option>
                      </Form.Select>
                    ) : (
                      user.role
                    )}</td>
                    <td>
                      {editingUserId === user._id ? (
                        <Button variant="success" onClick={() => handleSaveRole(user._id)}>
                          Save
                        </Button>
                      ) : (
                        <Button variant="warning" onClick={() => handleEditRole(user._id)}>
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
