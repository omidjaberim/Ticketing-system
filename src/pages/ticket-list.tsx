import { Box, Button, Paper, TextField, Tooltip } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from "react";
import { ITicket } from "../dto/ticket";
import { getAllTickets, searchTicket } from "../utils/localStorage";
import AddTicket from "./add-ticket";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


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
        { field: 'title', headerName: 'title', width: 150 },
        { field: 'message', headerName: 'message', width: 380 },
        { field: 'received', headerName: 'received Date', width: 290 ,
            renderCell: (params)=>( new Date(params.row.received).toString().split("G")[0] )
        },
        { field: 'status', headerName: 'status', width: 100 },
        { field: 'operation', headerName: 'operation', width: 100,
            renderCell: (params)=>(
                params.row.isClose ? <Tooltip title="closed" ><CloseIcon /></Tooltip> : 
                <Button color="primary" onClick={()=>navigate("/details/"+params.id)} size="small" variant="outlined" >Details</Button> 
                )
    },
    ]

    const [searchedTxt, setSearchedTxt] = useState<string>("")
    const search = ()=>{
        setTickets(searchTicket(searchedTxt))
        setIsSearched(!isSearched)
    }

    return(
        <div className="w-full h-screen flex flex-col items-center">
            <AddTicket  open={addTicket} handleClose={()=>setAddTicket(false)} />
            <Box className="w-full flex p-8 justify-end" >
                <Button color="primary" variant="contained" onClick={()=>setAddTicket(true)}  >create a ticket</Button>      
            </Box>            

            <Paper className="w-96  p-6 mb-2 flex justify-start" >
                <TextField onChange={(e)=>setSearchedTxt(e.target.value)}
                    label="Search for Title"   placeholder="Search for Title" />   
                <Button onClick={search} size="small" variant="contained" >Search</Button>
            </Paper>

            <Box sx={{height:600,width:'90%',display:'flex'}} >
            <DataGrid
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