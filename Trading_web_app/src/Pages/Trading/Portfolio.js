
import { useState , useEffect } from "react"
import * as apiService from "../../Services/Trading_api_service";
import Table from "../../Components/Table";
import NavBar from "../../Components/NavBar";
import Sidebar from "../../Components/SideBar";
export default function Portfolio() {

    const [orders,setOrders]=useState([])

    useEffect(()=>{
      console.log(localStorage.token)
      apiService.orders(localStorage.token).then((res)=>{
        console.log(res)
        setOrders(res)

      })

    },[])
    const columns = [
        { field: "symbol", headerName: "symbol", align: "left" },
        { field: "price", headerName: "price", align: "left" },
        { field: "quantity", headerName: "quantity", align: "right" },
        { field: "status", headerName: "status", align: "right" },
        { field: "action", headerName: "action", align: "right" },
        { field: "submitted_at", headerName: "submitted_at", align: "right" },
        
        
      ];

    return (<div id="wrapper">


        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">


        <div id="content">
            
            <NavBar></NavBar>
            <div className="container-fluid">
                <Table columns={columns}  data={orders} type={'sell'} rowsPerPageOptions={[10,20]} > </Table>
            </div>
            </div></div>
        </div>)
    
}