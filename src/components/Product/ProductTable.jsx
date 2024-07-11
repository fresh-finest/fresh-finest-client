import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { DatePicker, Checkbox, Dropdown, Menu } from "antd";
import axios from "axios";
import { FaFilter } from "react-icons/fa";


const { RangePicker } = DatePicker;

const ProductTable = () => {
    const [products, setProducts] = useState([]);
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
  
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product/");
        setProducts(response.data.result);
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
  
  
    /* const menu = (
      <Menu>
        <Checkbox.Group
          options={columns.map(col => ({ label: col.label, value: col.key }))}
          defaultValue={selectedColumns}
          onChange={handleColumnChange}
          style={{ padding: "10px" }}
        />
      </Menu>
    ); */
  
  
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
              <tr key={product.id}>
                <td>{index + 1}</td>
                {columns
                  .filter(column => selectedColumns.includes(column.key))
                  .map(column => (
                    <td key={column.key}>{product[column.key]}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  
  
  export default ProductTable;
  