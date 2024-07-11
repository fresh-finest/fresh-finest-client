import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import ProductTable from "../../components/Product/ProductTable";


const AllProducts = () => {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleAddProduct = async (event) => {
    event.preventDefault();
   
    const formData = new FormData();
    formData.append("sku", event.target.elements.productSku.value);
    formData.append("title", event.target.elements.productTitle.value);
    formData.append("campaigns", event.target.elements.productCampaigns.value);
    formData.append("ctr", event.target.elements.productCtr.value);
    formData.append("impressions", event.target.elements.productImpressions.value);
    formData.append("spend", event.target.elements.productSpend.value);
    formData.append("clicks", event.target.elements.productClicks.value);
    formData.append("cpc", event.target.elements.productCpc.value);
    formData.append("acos", event.target.elements.productAcos.value);
 
    console.log('Form Data:', Object.fromEntries(formData.entries())); // Log form data
 
    try {
      const response = await axios.post("http://localhost:5000/api/product/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
 


  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>


      <ProductTable />


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="productSku">
                  <Form.Label>Product SKU</Form.Label>
                  <Form.Control type="text" placeholder="Enter product SKU" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="productTitle">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter product title" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="productCampaigns">
                  <Form.Label>Campaigns</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of campaigns" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="productCtr">
                  <Form.Label>CTR</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter CTR" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="productImpressions">
                  <Form.Label>Impressions</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of impressions" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="productSpend">
                  <Form.Label>Spend</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter spend amount" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="productClicks">
                  <Form.Label>Clicks</Form.Label>
                  <Form.Control type="number" placeholder="Enter number of clicks" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="productCpc">
                  <Form.Label>CPC</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="Enter CPC" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="productAcos">
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
