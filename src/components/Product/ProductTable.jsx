import { Menu, DatePicker,Checkbox,Dropdown } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const {RangePicker}= DatePicker;

export default function ProductTable() {
    const baseUrl = useSelector((state) => state.baseUrl.baseUrl); // Get the base URL from Redux
    const [products,setProducts]= useState([]);
    const [selectedColumns, setSelectedColumns] = useState([
        "sku",
        "title",
        "campaigns",
        "ctr",
        "impressions",
        "spend",
        "clicks",
        "cpc",
        "acos"
    ]);
    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async()=>{
        try {
            const response =await axios.get(`${baseUrl}/api/product`);
            setProducts(response.data.result);
        } catch (error) {
            console.error("Error fetching products: ",error)
        }
    };

    const handleDateChange = (dates,dateSettings)=>{
        console.log("Selected Date Range: ", dates,dateSettings);

    }

    const handleColumnChange =(checkedValues)=>{
        setSelectedColumns(checkedValues);
    }

    const columns =[
        {key:"sku", label:"SKU"},
        {key:"title", label:"Title"},
        {key:"campaigns", label:"Campaigns"},
        {key:"ctr",label:"CTR"},
        {key:"impressions", label:"Impressions"},
        {key:"spend", label:"Spend"},
        {key: "cpc", label:"CPC"},
        {key: "acos", label: "ACOS"}
    ]

    const menu = (
        <Menu>
            <Checkbox.Group
                options={columns.map(col=>({
                    label: col.label, value: col.key
                }))}
                defaultValue = {selectedColumns}
                onChange={handleColumnChange}
                style={{MdPadding:"10px"}}
            />
        </Menu>
    )
  return (
    <div>
    <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center", marginBottom:"20px"}}>
    <RangePicker />

    </div>
    </div>
  )
}
