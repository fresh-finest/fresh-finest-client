import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, Form } from "react-bootstrap";
import { DatePicker, Checkbox, Menu, Dropdown } from "antd";
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
  const [itemsPerPage, setItemsPerPage] = useState(15); // Number of items per page
  const [visibleDropdowns, setVisibleDropdowns] = useState({});
  const [visibleNestedDropdowns, setVisibleNestedDropdowns] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

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

  const handleColumnChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Date Range: ", dates, dateStrings);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  const handleRowClick = (index) => {
    setVisibleDropdowns(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleNestedRowClick = (index) => {
    setVisibleNestedDropdowns(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleColumnClick = () => {
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

  const menu = (
    <Menu>
      <Checkbox.Group
        options={columns.map(col => ({ label: col.label, value: col.key }))}
        defaultValue={selectedColumns}
        onChange={handleColumnChange}
        style={{ padding: "10px" }}
      />
    </Menu>
  );

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const demoData1 = [
    { campaignType: "Type 1", clicks: 100, orders: 10, impressions: 1000, sales: "$1000", cpc: "$1", bid: "$0.5", acos: "10%" },
    { campaignType: "Type 2", clicks: 150, orders: 15, impressions: 1500, sales: "$1500", cpc: "$1.5", bid: "$0.75", acos: "10%" }
  ];

  const demoData2 = [
    { active: "Yes", keyword: "Keyword 1", matchType: "Exact", status: "Active", suggestedBid: "$1.5", bid: "$1.2", impressions: 1000, topOfSearchIS: "50%", clicks: 100, ctr: "10%", spend: "$100", cpc: "$1", orders: 10, sales: "$1000", acos: "10%", roas: "5" },
    { active: "No", keyword: "Keyword 2", matchType: "Broad", status: "Paused", suggestedBid: "$1.0", bid: "$0.8", impressions: 500, topOfSearchIS: "30%", clicks: 50, ctr: "10%", spend: "$50", cpc: "$1", orders: 5, sales: "$500", acos: "10%", roas: "5" }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
        <RangePicker onChange={handleDateChange} style={{ marginRight: "20px" }} />
        <Dropdown overlay={menu} trigger={['click']}>
          <Button variant="primary">
            Columns
          </Button>
        </Dropdown>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th><Checkbox /></th>
            <th>Image</th>
            {selectedColumns.length === 0 ? (
              columns.map(column => <th key={column.key}>{column.label}</th>)
            ) : (
              columns
                .filter(column => selectedColumns.includes(column.key))
                .map(column => (
                  <th key={column.key}>{column.label}</th>
                ))
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr onClick={() => handleRowClick(index)}>
                <td><Checkbox /></td>
                <td><img src="https://i5.walmartimages.com/seo/Starbucks-Naturally-Flavored-Vanilla-Coffee-Syrup-12-7-fl-oz_3475d369-a1a6-4df3-929c-d5874e9adb43_1.47e3bb755b7fc8b870da82f4e0bff50c.jpeg" alt={product.title} style={{ width: "30px", height: "30px", borderRadius: "50%" }} /></td>
                {selectedColumns.length === 0 ? (
                  columns.map(column => (
                    <td key={column.key}>
                      {product[column.key]}
                    </td>
                  ))
                ) : (
                  columns
                    .filter(column => selectedColumns.includes(column.key))
                    .map(column => (
                      <td key={column.key}>
                        {product[column.key]}
                      </td>
                    ))
                )}
              </tr>
              {visibleDropdowns[index] && (
                <tr>
                  <td colSpan={selectedColumns.length === 0 ? columns.length + 3 : selectedColumns.length + 3} style={{ paddingLeft: "20px" }}>
                    <Table striped bordered hover size="sm" style={{ marginLeft: "20px" }}>
                      <thead>
                        <tr>
                          <th>Campaign Type</th>
                          <th>Clicks</th>
                          <th>Orders</th>
                          <th>Impressions</th>
                          <th>Sales</th>
                          <th>CPC</th>
                          <th>Bid</th>
                          <th>ACOS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoData1.map((item, idx) => (
                          <React.Fragment key={idx}>
                            <tr onClick={() => handleNestedRowClick(index + '-' + idx)}>
                              <td>{item.campaignType}</td>
                              <td>{item.clicks}</td>
                              <td>{item.orders}</td>
                              <td>{item.impressions}</td>
                              <td>{item.sales}</td>
                              <td>{item.cpc}</td>
                              <td>{item.bid}</td>
                              <td>{item.acos}</td>
                            </tr>
                            {visibleNestedDropdowns[index + '-' + idx] && (
                              <tr>
                                <td colSpan={8} style={{ paddingLeft: "40px" }}>
                                  <Table striped bordered hover size="sm" style={{ marginLeft: "20px" }}>
                                    <thead>
                                      <tr>
                                        <th>Active</th>
                                        <th>Keyword</th>
                                        <th>Match Type</th>
                                        <th>Status</th>
                                        <th>Suggested Bid</th>
                                        <th>Bid</th>
                                        <th>Impressions</th>
                                        <th>Top-of-search IS</th>
                                        <th>Clicks</th>
                                        <th>CTR</th>
                                        <th>Spend</th>
                                        <th>CPC</th>
                                        <th>Orders</th>
                                        <th>Sales</th>
                                        <th>ACOS</th>
                                        <th>ROAS</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {demoData2.map((item, idx2) => (
                                        <tr key={idx2} onClick={handleColumnClick}>
                                          <td>{item.active}</td>
                                          <td>{item.keyword}</td>
                                          <td>{item.matchType}</td>
                                          <td>{item.status}</td>
                                          <td>{item.suggestedBid}</td>
                                          <td>{item.bid}</td>
                                          <td>{item.impressions}</td>
                                          <td>{item.topOfSearchIS}</td>
                                          <td>{item.clicks}</td>
                                          <td>{item.ctr}</td>
                                          <td>{item.spend}</td>
                                          <td>{item.cpc}</td>
                                          <td>{item.orders}</td>
                                          <td>{item.sales}</td>
                                          <td>{item.acos}</td>
                                          <td>{item.roas}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
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
    </div>
  );
};

export default ProductTable;
