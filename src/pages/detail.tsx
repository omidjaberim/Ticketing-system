import { Box, Button , Paper, TextField} from "@mui/material"
import { useNavigate ,useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { IAnswer, ITicket } from "../dto/ticket";
import HomeIcon from '@mui/icons-material/Home';
import { Close } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { closeTicket, getAllAnswers, setAnswer } from "../utils/localStorage";
const Detail = ()=>{
    let navigate = useNavigate();
    const param = useParams();
    const [newAnswer,setNewAnswer] = useState<number>(0);    
    const [pageSize, setPageSize] = useState<number>(5);
    const [userAnswers,setUserAnswers] = useState<IAnswer[]>([])
    const columns:GridColDef[] = [
        { field: 'message', headerName: 'answer' },       
    ]

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ITicket>();
    
    const onSubmit = (data:ITicket) => {
        setAnswer({...data,parentId:Number(param.id),id:Math.round(Math.random()*10000000) }) 
        reset({
            message: ""
          });
        setNewAnswer(prev=>prev +1)
    }
    useEffect(()=>{
        const data  = getAllAnswers()
        setUserAnswers(data.filter((answer:IAnswer)=>answer.parentId === Number(param.id)))
    },[newAnswer])

    const closeThisTicket = useCallback(()=>{
        closeTicket(Number(param.id))
    },[])

    return (
        <div className="w-full h-screen flex flex-col items-center">
            <div className="w-full m-4 flex flex-col justify-center items-center " >
                <Box className="w-96 flex mt-4 mb-4 justify-between" >
                    <Button  className="h-10" color="primary" variant="contained" 
                        onClick={()=>navigate("/")}  ><HomeIcon/>Back To Home</Button>      

                    <Button  className="h-10"  color="warning" variant="contained" 
                        onClick={()=>{closeThisTicket();navigate("/")}}  ><Close/>Close Ticket</Button>      
                    
                </Box> 
                <Paper className="w-96 flex flex-col p-8 justify-center items-center " >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="mb-4"  >
                            <TextField   label="Answer" required rows={5} multiline className='mt-4' 
                                placeholder="Answer" {...register("message",{required:true})} />
                        </Box>
                        {errors.message && <span className='text-sm text-red-500' >
                            This field is required
                        </span>
                        }     
                        <Button type='submit' fullWidth  color='primary' variant='contained' autoFocus>
                            Submit The Answer
                        </Button> 
                    </form>    
                </Paper>
            </div>
            <Box sx={{height:400,width:'90%',display:'flex'}} >
            <DataGrid
                pageSize={pageSize}
                onPageSizeChange={(newPageSize:number) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                rows={userAnswers}
                columns={columns}    
            />
            </Box>
        </div>
    )
}
export default Detail