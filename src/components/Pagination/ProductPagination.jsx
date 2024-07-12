import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from 'react-redux';


export default function ProductPagination() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15); // Number of items per page
    const [totalProducts, setTotalProducts] = useState(0);
    const baseUrl = useSelector((state) => state.baseUrl.baseUrl);

    const fetchProducts = async (page, limit) => {
        try {
          const response = await axios.get(`${baseUrl}/api/product/limit`, {
            params: { page, limit }
          });
          setTotalProducts(response.data.totalProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page whenever items per page changes
      };
      const totalPages = Math.ceil(totalProducts / itemsPerPage);
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
    <Form.Group controlId="itemsPerPageSelect" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{width:'150px' }}>Products per page:</Form.Label>
      <Form.Control as="select" value={itemsPerPage} style={{ marginRight: '10px',width:'70px' }} onChange={handleItemsPerPageChange}>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Form.Control>
    </Form.Group>
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
      />
      {[...Array(totalPages).keys()].map((page) => (
        <Pagination.Item
          key={page + 1}
          active={page + 1 === currentPage}
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
      />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  </div>
  )
}
