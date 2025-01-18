import React from 'react'
import NavBar from "../../Components/NavBar";
import Sidebar from "../../Components/SideBar";
import BuyStockForm from '../../Components/Form';
import { useLocation } from 'react-router-dom';
const Buy_stock = () => {
    const location = useLocation();
    const { data } = location.state || {};
   
  return (

    <div>
        
        <div id="wrapper">


<Sidebar></Sidebar>
<div id="content-wrapper" className="d-flex flex-column">


<div id="content">
    
    <NavBar></NavBar>
    <div className="container-fluid">
    <div className="row">

<div className="col-xl-8 col-lg-7">

    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Stock Price</h6>
        </div>
        <div className="card-body">
            <div className="chart-area">
               
            </div>
    
        </div>
    </div>

    
    <div className="card shadow mb-4">
        <div className="card-header py-8">
            <h6 className="m-0 font-weight-bold text-primary">Buy Stock</h6>
        </div>
        <div className="card-body">
            <div className="chart-bar h-[1000px]">
               <BuyStockForm data={data}></BuyStockForm>
            </div>
           
        </div>
    </div></div>
    </div>
    </div>
</div></div></div>
    </div>
  )
}

export default Buy_stock;