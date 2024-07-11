import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

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
    
  return (
    <div>ProductTable</div>
  )
}
