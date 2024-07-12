import React, { useState, useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { DatePicker, Checkbox, Dropdown, Menu } from "antd";
import axios from "axios";
import { useSelector } from 'react-redux';
import UploadCSV from "./UploadCSV";

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

  console.log("total: "+totalProducts)
 console.log("data: "+products)
  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Date Range: ", dates, dateStrings);
  };

  const handleColumnChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
        <RangePicker onChange={handleDateChange} style={{ marginRight: "20px" }} />
        <Dropdown overlay="" trigger={['click']}>
          <Button variant="primary">
            Columns
          </Button>
        </Dropdown>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {columns
              .filter(column => selectedColumns.includes(column.key))
              .map(column => (
                <th key={column.key}>{column.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              {columns
                .filter(column => selectedColumns.includes(column.key))
                .map(column => (
                  <td key={column.key}>{product[column.key]}</td>
                ))}
            </tr>
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
    </div>
  );
};

export default ProductTable;
