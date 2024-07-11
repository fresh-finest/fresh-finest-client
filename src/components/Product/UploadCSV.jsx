
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Papa from "papaparse";
import axios from "axios";

const UploadCSV = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          try {
            const response = await axios.post("http://localhost:5000/api/product/upload", results.data);
            console.log("Products added successfully:", response.data);
            handleClose();
          } catch (error) {
            console.error("Error adding products:", error);
          }
        },
      });
    }
  };

  return (
    <div>
      <Button variant="secondary" onClick={handleShow} style={{ marginLeft: "10px" }}>
        Add Products via CSV
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select CSV File</Form.Label>
              <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UploadCSV;
