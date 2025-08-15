import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { jwtDecode } from 'jwt-decode' 
import * as apiService from "../Services/Trading_api_service";
import * as apiService1 from "../Services/Financial_management_service";
import { useNavigate } from 'react-router-dom';


const CustomizableTable = ({ columns, data, rowsPerPageOptions = [2, 5, 10] , type }) => {
  const [page, setPage] = useState(0);
  const navigate=useNavigate()
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [address, setAddress] = useState("");
  const [balance,setBalance]=useState(0)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(()=>{
      const token = localStorage.token;
      const user = jwtDecode(token)
      console.log(user)
      setAddress(user.address)
   
  })
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const Buy_stock = (row) => {
    console.log(row)
    console.log(address)
    console.log(balance)
    console.log(localStorage.token)
   
    navigate("/buy_stock",{ state: { data:row } })
  };
  const Sell_stock = async(row) => {
    const ut=sessionStorage.getItem("user_token")
    const authToken=sessionStorage.getItem("token")
    
    await apiService.sell_stock(authToken,row.symbol,1).then(async(res)=>{
      console.log(res)
      try{
           const s=await apiService1.deposit(ut,row.price)
           console.log(s)
          
           }catch(error){
             alert(error)
           }

    })
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || "left"}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    align={column.align || "left"}
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
                { type === 'buy' ? (<button className="btn btn-dark" onClick={() => Buy_stock(row)}>Buy Stock</button>):(
                  <button className="btn btn-dark" onClick={() => Sell_stock(row)}>Sell Stock</button>
                )}
                 
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CustomizableTable;
