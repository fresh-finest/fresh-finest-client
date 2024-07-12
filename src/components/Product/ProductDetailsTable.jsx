import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Dropdown, Modal } from "react-bootstrap";
import { DatePicker } from "antd";
import axios from "axios";
import { useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

const ProductTable = () => {
  const baseUrl = useSelector((state) => state.baseUrl.baseUrl);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([
    "sku",
    "title",
    "campaigns",
    "ctr",
    "impressions",
    "spend",
    "clicks",
    "cpc",
    "acos",
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [visibleNestedDropdown, setVisibleNestedDropdown] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage]);

  const fetchProducts = async (page, limit) => {
    try {
      const response = await axios.get(`${baseUrl}/api/product/limit`, {
        params: { page, limit }
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Date Range: ", dates, dateStrings);
  };

  const handleColumnChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (index) => {
    setVisibleDropdown(visibleDropdown === index ? null : index);
  };

  const handleCampaignClick = (index) => {
    setVisibleNestedDropdown(visibleNestedDropdown === index ? null : index);
  };

  const handleColumnHeadingClick = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const columns = [
    { key: "sku", label: "SKU" },
    { key: "title", label: "Title" },
    { key: "campaigns", label: "Campaigns" },
    { key: "ctr", label: "CTR" },
    { key: "impressions", label: "Impressions" },
    { key: "spend", label: "Spend" },
    { key: "clicks", label: "Clicks" },
    { key: "cpc", label: "CPC" },
    { key: "acos", label: "ACoS" },
  ];

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
        <RangePicker onChange={handleDateChange} style={{ marginRight: "20px" }} />
        <Dropdown>
          <Dropdown.Toggle variant="primary">
            Columns
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Add your column selection menu items here */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {columns
              .filter(column => selectedColumns.includes(column.key))
              .map(column => (
                <th key={column.key} onClick={handleColumnHeadingClick}>{column.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr onClick={() => handleRowClick(index)}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                {columns
                  .filter(column => selectedColumns.includes(column.key))
                  .map(column => (
                    <td key={column.key}>
                      {product[column.key]}
                    </td>
                  ))}
              </tr>
              {visibleDropdown === index && (
                <tr>
                  <td colSpan={selectedColumns.length + 1}>
                    <Dropdown.Menu show>
                      <Dropdown.Item>Campaign Keyword</Dropdown.Item>
                      <Dropdown.Item>CTR</Dropdown.Item>
                      <Dropdown.Item>Organic Rank</Dropdown.Item>
                      <Dropdown.Item>Sponsosed Rank</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleCampaignClick(index)}>Campaigns</Dropdown.Item>
                      <Dropdown.Item>Orders</Dropdown.Item>
                      <Dropdown.Item>Spend</Dropdown.Item>
                      <Dropdown.Item>Sales</Dropdown.Item>
                      <Dropdown.Item>ACOS</Dropdown.Item>
                    </Dropdown.Menu>
                    {visibleNestedDropdown === index && (
                      <Dropdown.Menu show style={{ marginTop: '10px' }}>
                        <Dropdown.Item>Campaign Type</Dropdown.Item>
                        <Dropdown.Item>Clicks</Dropdown.Item>
                        <Dropdown.Item>Orders</Dropdown.Item>
                        <Dropdown.Item>Impressions</Dropdown.Item>
                        <Dropdown.Item>Sales</Dropdown.Item>
                        <Dropdown.Item>CPC</Dropdown.Item>
                        <Dropdown.Item>Bid</Dropdown.Item>
                        <Dropdown.Item>ACOS</Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
      <Modal show={drawerVisible} onHide={handleDrawerClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Detailed View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Drawer content here */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductTable;
