import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, Form } from "react-bootstrap";
import { DatePicker, Checkbox, Menu, Dropdown } from "antd";
import axios from "axios";
import { useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

const Keyword = () => {
  const baseUrl = useSelector((state) => state.baseUrl.baseUrl);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([
    "asin",
    "appSku",
    "cpc",
    "ctr",
    "cost",
    "impressions",
    "etc1",
    "etc2",
    "etc3",
    "etc4",
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Number of items per page
  const [visibleDropdowns, setVisibleDropdowns] = useState({});
  const [visibleNestedDropdowns, setVisibleNestedDropdowns] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const fetchProducts = async (page, limit) => {
    try {
      const response = await axios.get(`https://fresh-finest-server-dd57784051b3.herokuapp.com/api/product/limit`, {
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
    { key: "asin", label: "ASIN" },
    { key: "appSku", label: "APP SKU" },
    { key: "cpc", label: "CPC" },
    { key: "ctr", label: "CTR" },
    { key: "cost", label: "COST" },
    { key: "impressions", label: "IMPRESSIONS" },
    { key: "etc1", label: "ETC 1" },
    { key: "etc2", label: "ETC 2" },
    { key: "etc3", label: "ETC 3" },
    { key: "etc4", label: "ETC 4" },
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
    { keyword: "Keyword 1", data1: "Data1", data3: "Data3", data4: "Data4", etcCampaigns: "Campaigns" },
    { keyword: "Keyword 2", data1: "Data1", data3: "Data3", data4: "Data4", etcCampaigns: "Campaigns" },
    { keyword: "Keyword 3", data1: "Data1", data3: "Data3", data4: "Data4", etcCampaigns: "Campaigns" }
];

const demoData2 = [
    { campaignType: "CampaignType1", cpc: "CPC1", bid: "Bid1", cost: "Cost1", sales: "Sales1", acos: "ACOS1", campaignLink: "Campaign Link1" },
    { campaignType: "CampaignType2", cpc: "CPC2", bid: "Bid2", cost: "Cost2", sales: "Sales2", acos: "ACOS2", campaignLink: "Campaign Link2" },
    { campaignType: "CampaignType3", cpc: "CPC3", bid: "Bid3", cost: "Cost3", sales: "Sales3", acos: "ACOS3", campaignLink: "Campaign Link3" }
];

const demoData3 = [
    { history: "History1", data1: "Data1", data2: "Data2", data3: "Data3", data4: "Data4", data5: "Data5", data6: "Data6", data7: "Data7" },
    { history: "History2", data1: "Data1", data2: "Data2", data3: "Data3", data4: "Data4", data5: "Data5", data6: "Data6", data7: "Data7" },
    { history: "History3", data1: "Data1", data2: "Data2", data3: "Data3", data4: "Data4", data5: "Data5", data6: "Data6", data7: "Data7" }
];


  const filteredProducts = products.filter(product =>
    selectedColumns.some(column =>
      product[column] && product[column].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        
        <Form.Control 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ width: '200px' }}
        />
        <div>
          <Button style={{ marginRight: "10px" }}>Filter</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button variant="primary">
              Columns
            </Button>
          </Dropdown>
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
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
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr onClick={() => handleRowClick(index)}>
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
                          <th>Keyword</th>
                          <th>Data1</th>
                          <th>Data3</th>
                          <th>Data4</th>
                          <th>ETC Campaigns</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoData1.map((item, idx) => (
                          <React.Fragment key={idx}>
                            <tr onClick={() => handleNestedRowClick(index + '-' + idx)}>
                              <td>{item.keyword}</td>
                              <td>{item.data1}</td>
                              <td>{item.data3}</td>
                              <td>{item.data4}</td>
                              <td>{item.etcCampaigns}</td>
                            </tr>
                            {visibleNestedDropdowns[index + '-' + idx] && (
                              <tr>
                                <td colSpan={5} style={{ paddingLeft: "40px" }}>
                                  <Table striped bordered hover size="sm" style={{ marginLeft: "20px" }}>
                                    <thead>
                                      <tr>
                                        <th>CampaignType</th>
                                        <th>CPC</th>
                                        <th>Bid</th>
                                        <th>Cost</th>
                                        <th>Sales</th>
                                        <th>ACOS</th>
                                        <th>Campaign Link</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {demoData2.map((item, idx2) => (
                                        <React.Fragment key={idx2}>
                                          <tr onClick={() => handleNestedRowClick(index + '-' + idx + '-' + idx2)}>
                                            <td>{item.campaignType}</td>
                                            <td>{item.cpc}</td>
                                            <td>{item.bid}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.sales}</td>
                                            <td>{item.acos}</td>
                                            <td>{item.campaignLink}</td>
                                          </tr>
                                          {visibleNestedDropdowns[index + '-' + idx + '-' + idx2] && (
                                            <tr>
                                              <td colSpan={7} style={{ paddingLeft: "60px" }}>
                                                <Table striped bordered hover size="sm" style={{ marginLeft: "20px" }}>
                                                  <thead>
                                                    <tr>
                                                      <th>History</th>
                                                      <th>Data1</th>
                                                      <th>Data2</th>
                                                      <th>Data3</th>
                                                      <th>Data4</th>
                                                      <th>Data5</th>
                                                      <th>Data6</th>
                                                      <th>Data7</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {demoData3.map((item, idx3) => (
                                                      <tr key={idx3}>
                                                        <td>{item.history}</td>
                                                        <td>{item.data1}</td>
                                                        <td>{item.data2}</td>
                                                        <td>{item.data3}</td>
                                                        <td>{item.data4}</td>
                                                        <td>{item.data5}</td>
                                                        <td>{item.data6}</td>
                                                        <td>{item.data7}</td>
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

export default Keyword;
