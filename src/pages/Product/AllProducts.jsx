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

  const handleClose = () => {
    setShow(false);
    setErrors({});
  };
  const handleShow = () => setShow(true);

  const handleAddProduct = async (event) => {
    event.preventDefault();

    const sku = event.target.elements.sku.value.trim();
    const title = event.target.elements.title.value.trim();

    // Basic frontend validation
    const newErrors = {};
    if (!sku) newErrors.sku = "SKU is required";
    if (!title) newErrors.title = "Title is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("sku", event.target.elements.sku.value);
    formData.append("title", event.target.elements.title.value);
    formData.append("campaigns", event.target.elements.campaigns.value);
    formData.append("ctr", event.target.elements.ctr.value);
    formData.append("impressions", event.target.elements.impressions.value);
    formData.append("spend", event.target.elements.spend.value);
    formData.append("clicks", event.target.elements.clicks.value);
    formData.append("cpc", event.target.elements.cpc.value);
    formData.append("acos", event.target.elements.acos.value);
    // formData.append("category", event.target.elements.category.value);
    // formData.append("tags", event.target.elements.tags.value.split(',').map(tag => tag.trim()));

    console.log('Form Data:', Object.fromEntries(formData.entries())); // Log form data

    try {
      const response = await axios.post(`https://fresh-finest-server-dd57784051b3.herokuapp.com/api/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      handleClose();
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
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
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
          <Form onSubmit={handleAddProduct}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="sku">
                  <Form.Label>Product SKU</Form.Label>
                  <Form.Control type="text" placeholder="Enter product SKU" required isInvalid={!!errors.sku} />
                  <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter product title" required isInvalid={!!errors.title} />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="campaigns">
                  <Form.Label>Campaigns</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of campaigns" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="ctr">
                  <Form.Label>CTR</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter CTR" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="impressions">
                  <Form.Label>Impressions</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of impressions" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="spend">
                  <Form.Label>Spend</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter spend amount" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="clicks">
                  <Form.Label>Clicks</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of clicks" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="cpc">
                  <Form.Label>CPC</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter CPC" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="acos">
                  <Form.Label>ACOS</Form.Label>
                  <Form.Control type="text" placeholder="Enter ACOS" />
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
