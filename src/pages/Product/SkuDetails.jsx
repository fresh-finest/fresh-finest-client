import React from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';

const SkuDetails = ({ sku }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>SKU Details</Card.Title>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Sku</Form.Label>
                <Form.Control type="text" value={sku.sku} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={sku.title} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Amazon Price</Form.Label>
                <Form.Control type="text" value={sku.amazonPrice} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Shipping Cost</Form.Label>
                <Form.Control type="text" value={sku.shippingCost} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>UOM</Form.Label>
                <Form.Control type="text" value={sku.uom} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>ASIN</Form.Label>
                <Form.Control type="text" value={sku.asin} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>FNSKU</Form.Label>
                <Form.Control type="text" value={sku.fnsku} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Sales Rank</Form.Label>
                <Form.Control type="text" value={sku.salesRank} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" value={sku.brand} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" value={sku.status} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>FBM/FBA/FBT</Form.Label>
                <Form.Control type="text" value={sku.fbmFbaFbt} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>FBA Fees</Form.Label>
                <Form.Control type="text" value={sku.fbaFees} readOnly />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SkuDetails;
