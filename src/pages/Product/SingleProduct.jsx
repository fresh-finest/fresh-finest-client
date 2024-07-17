import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SkuDetails from './SkuDetails';
import amazonlogo from '../../assets/images/amazonlogo.png';


const amazonLogo =()=>{
  return amazonlogo;
}
export default function SingleProduct() {
  const [selectedSku, setSelectedSku] = useState(null);

  const products = [
    {
      sku: 'F-SY-5501-A',
      title: 'Syrup Vanilla',
      amazonPrice: '$12.99',
      shippingCost: '$4.99',
      uom: 'Bottle',
      asin: 'B07XYL9XZL',
      fnsku: 'X00001XZL',
      salesRank: '1200',
      brand: 'Syrup Brand',
      status: 'Active',
      fbmFbaFbt: 'FBA',
      fbaFees: '$1.99',
      logo: amazonLogo(),
      name: 'Amazon'
    },
    {
      sku: 'F-SY-5502-A',
      title: 'Syrup Chocolate',
      amazonPrice: '$14.99',
      shippingCost: '$5.99',
      uom: 'Bottle',
      asin: 'B07XYL9XZM',
      fnsku: 'X00002XZM',
      salesRank: '1100',
      brand: 'Syrup Brand',
      status: 'Inctive',
      fbmFbaFbt: 'FBM',
      fbaFees: '$2.99',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/1200px-EBay_logo.svg.png',
      name: 'Ebay'
    },
    {
      sku: 'F-SY-5503-A',
      title: 'Syrup Caramel',
      amazonPrice: '$13.99',
      shippingCost: '$4.49',
      uom: 'Bottle',
      asin: 'B07XYL9XZN',
      fnsku: 'X00003XZN',
      salesRank: '1150',
      brand: 'Syrup Brand',
      status: 'Active',
      fbmFbaFbt: 'FBT',
      fbaFees: '$1.79',
      logo: 'https://purepng.com/public/uploads/large/purepng.com-walmart-logologobrand-logoiconslogos-251519939045oqelv.png',
      name: 'Walmart'
    }
    // Add more products as needed
  ];

  const handleCardClick = (product) => {
    setSelectedSku(product);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3}>
          <Card>
            <Card.Img variant="top" src="https://syruvia.com/cdn/shop/files/Untitled_design_23.png" />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>SKU-SY-5500</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Row>
            {products.map((product, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card
                  onClick={() => handleCardClick(product)}
                  style={{
                    cursor: 'pointer',
                  
                    backgroundColor:
                      selectedSku && selectedSku.sku === product.sku
                        ? product.status === 'Active'
                          ? 'lightgreen'
                          : 'lightgray'
                        : 'white'
                  }}
                >
                  <Card.Body
                    style={{
                      borderRadius:"20px",
                      backgroundColor:
                        selectedSku && selectedSku.sku === product.sku
                          ? product.status === 'Active'
                            ? 'lightgreen'
                            : 'lightgray'
                          : 'white'
                    }}
                  >
                    <Card.Title>
                      {product.name}
                      <div
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: product.status === 'Active' ? 'lightgreen' : 'lightgray',
                          marginLeft: '10px'
                        }}
                      ></div>
                    </Card.Title>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Card.Img variant="top" src={product.logo} style={{ width: '70px', marginBottom: '10px' }} />
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{
                      backgroundColor:
                        selectedSku && selectedSku.sku === product.sku
                          ? product.status === 'Active'
                            ? 'lightgreen'
                            : 'lightgray'
                          : 'white'
                    }}>
                          {product.sku} <span className="text-muted">({product.title})</span>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>{selectedSku && <SkuDetails sku={selectedSku} />}</Col>
      </Row>
    </Container>
  );
}
