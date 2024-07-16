import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import ProductTable from "../../components/Product/ProductTable";
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const baseUrl = useSelector((state) => state.baseUrl.baseUrl);

  console.log(baseUrl);

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    sku: '',
    title: '',
    campaigns: '',
    ctr: '',
    impressions: '',
    spend: '',
    clicks: '',
    cpc: '',
    acos: ''
    
   
  });

  const handleClose = () => {
    setShow(false);
    setErrors({});
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://fresh-finest-server-dd57784051b3.herokuapp.com/api/product`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      setFormData({
        sku: '',
        title: '',
        campaigns: '',
        ctr: '',
        impressions: '',
        spend: '',
        clicks: '',
        cpc: '',
        acos: ''
     
      
      });
      handleClose(); // Close the modal
    } catch (error) {
      if (error.response) {
        console.error("Error adding product:", error.response.data); // Log detailed error
      } else {
        console.error("Error adding product:", error.message);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
        
      </div>
      <ProductTable />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="sku">
                  <Form.Label>Product SKU</Form.Label>
                  <Form.Control type="text" placeholder="Enter product SKU" name="sku" value={formData.sku} onChange={handleChange} required isInvalid={!!errors.sku} />
                  <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter product title" name="title" value={formData.title} onChange={handleChange} required isInvalid={!!errors.title} />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="campaigns">
                  <Form.Label>Campaigns</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of campaigns" name="campaigns" value={formData.campaigns} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="ctr">
                  <Form.Label>CTR</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter CTR" name="ctr" value={formData.ctr} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="impressions">
                  <Form.Label>Impressions</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of impressions" name="impressions" value={formData.impressions} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="spend">
                  <Form.Label>Spend</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter spend amount" name="spend" value={formData.spend} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="clicks">
                  <Form.Label>Clicks</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of clicks" name="clicks" value={formData.clicks} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="cpc">
                  <Form.Label>CPC</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter CPC" name="cpc" value={formData.cpc} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="acos">
                  <Form.Label>ACOS</Form.Label>
                  <Form.Control type="text" placeholder="Enter ACOS" name="acos" value={formData.acos} onChange={handleChange} />
                </Form.Group>
              </Col>
              
            </Row>
            
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllProducts;
