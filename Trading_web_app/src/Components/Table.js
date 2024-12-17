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

const CustomizableTable = ({ columns, data, rowsPerPageOptions = [2, 5, 10] }) => {
  const [page, setPage] = useState(0);
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
      apiService.get_balance(localStorage.token,user.address).then((res)=>{
        console.log(res)
        setBalance(res.usd)
      },[])    
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
    apiService.buy_stock(localStorage.token,balance,row.symbol,1).then((res)=>{
      console.log(res)
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
                 <button className="btn btn-dark" onClick={() => Buy_stock(row)}>Buy Stock</button>
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
