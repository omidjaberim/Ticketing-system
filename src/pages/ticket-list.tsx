import { Box, Button, Paper, TextField, Tooltip, Typography } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { ITicket } from "../dto/ticket";
import { getAllTickets, searchTicket } from "../utils/localStorage";
import AddTicket from "./add-ticket";
import { useNavigate } from "react-router-dom";

import pendingIcon from 'img/pending.svg';
import doneIcon from 'img/done.svg';

const TicketList = ()=>{
    const [pageSize, setPageSize] = useState<number>(10);
    const [tickets,setTickets] = useState<ITicket[]>([]);
    const [addTicket,setAddTicket] = useState<boolean>(false);
    const [isSearched,setIsSearched] = useState<boolean>(false)
    let navigate = useNavigate();

    useEffect(()=>{
        setIsSearched(false)
        return ()=>setIsSearched(false)
    },[])

    useEffect(()=>{
        const data  = getAllTickets()        
        setTickets(data.sort((a:ITicket,b:ITicket)=>b.received - a.received))
    },[addTicket])

    const columns:GridColDef[] = [
        { field: 'title', headerName: 'موضوع تیکت', width: 250 },
        { field: 'received', headerName: 'تاریخ', width: 290 ,
            renderCell: (params)=>( new Date(params.row.received).toString().split("G")[0] )
        },
        { field: 'status', headerName: 'وضعیت تیکت', width: 180 ,
            renderCell: (params)=>(
                params.row.isClose ?                 
                <div className="w-full flex" >
                    <img src={doneIcon} alt="pending" /> 
                    <span>پاسخ داده شده </span>
                </div> : 
                <div className="w-full flex" >
                    <img src={pendingIcon} alt="pending" /> 
                    <span>در انتظار پاسخ </span>
                </div>
                )    
        },
        { field: 'operation', headerName: '', width: 100,
            renderCell : (params)=>(
                <Button color="primary" onClick={()=>navigate("/details/"+params.id)} size="small" variant="text" >مشاهده جزییات</Button>
            )

        },
    ]

    const [searchedTxt, setSearchedTxt] = useState<string>("")
    const search = ()=>{
        setTickets(searchTicket(searchedTxt))
        setIsSearched(!isSearched)
    }

    return(
        <div className="w-full h-screen flex flex-col items-center ">
            <AddTicket  open={addTicket} handleClose={()=>setAddTicket(false)} />
            <Box className="w-full flex p-8 justify-end" >
                <Button color="primary" variant="contained" onClick={()=>setAddTicket(true)}  >ایجاد تیکت</Button>      
            </Box>            

            <Paper className="w-96  p-6 mb-2 flex justify-start" >
                <TextField onChange={(e)=>setSearchedTxt(e.target.value)}
                    label="عنوان"   placeholder="Search for Title" />   
                <Button onClick={search} size="small" variant="contained" >جستجو</Button>
            </Paper>

            <Box sx={{height:600,width:'90%',display:'flex'}} className="bg-gray-200 p-8 flex-col " >
            <Typography className="p-4" > لیست تیکت‌ها </Typography>    
            <DataGrid
                sx={{
                    '.MuiDataGrid-columnSeparator': {
                      display: 'none',
                    },
                    '&.MuiDataGrid-root': {
                      border: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders':{
                        background : "#F5F5F5",
                        borderRadius: 3,                        
                        margin : "5px",
                        padding : "5px"
                    },
                    '& .MuiDataGrid-virtualScroller':{
                        padding : "15px"
                    },
                    '& .MuiDataGrid-row':{
                        boxShadow: '2px 5px 5px 1px #F5F5F5'
                    }
                  }}
                className="bg-white"
                pageSize={pageSize}
                onPageSizeChange={(newPageSize:number) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                rows={tickets}
                columns={columns}    
            />
            </Box>
        </div>
    )
}
export default TicketList