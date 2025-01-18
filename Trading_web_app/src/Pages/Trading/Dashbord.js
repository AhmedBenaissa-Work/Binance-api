import Table from "../../Components/Table";
import NavBar from "../../Components/NavBar";
import Sidebar from "../../Components/SideBar";
import { useEffect, useState } from "react";
import * as apiService from "../../Services/Trading_api_service";

export default function Dashboard()
{
    const [rows,setRows]=useState([])
   //const columns = ["asset","high","low","current","volume",'open',"timestamp"]
   const columns = [
    { field: "symbol", headerName: "asset", align: "left" },
    { field: "high", headerName: "high", align: "left" },
    { field: "low", headerName: "low", align: "right" },
    { field: "current", headerName: "current", align: "right" },
    { field: "open", headerName: "open", align: "right" },
    { field: "volume", headerName: "volume", align: "right" },
    
  ];

  const symbols = {
  "symbols": [
    "AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", 
    "META", "NVDA", "SPY", "DIS", "V", 
    "JPM", "BA", "NFLX", "INTC", "CSCO", 
    "PYPL", "GM", "KO", "WMT", "CVX"
  ]}

  useEffect(()=>{
    const token=localStorage.token;
    apiService.get_stock_market_data(token,symbols).then((response)=>{
         console.log(response)
         setRows(response)         

    })
  },[])

    return ( <div id="wrapper">


        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">


        <div id="content">
            
            <NavBar></NavBar>
            <div className="container-fluid">
                <Table columns={columns}  data={rows} type={'buy'} rowsPerPageOptions={[10,20]  } > </Table>
            </div>
            </div></div>
        </div>)
}