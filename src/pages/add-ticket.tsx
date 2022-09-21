import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Email from '@mui/icons-material/EmailRounded';
import { useForm } from "react-hook-form";
import { ITicket } from '../dto/ticket';
import { Box, Grid, TextField } from '@mui/material';
import { setTicket } from '../utils/localStorage';

interface IProp{
    open:boolean;
    handleClose : ()=>void;
}


const AddTicket = (prop:IProp)=>{
    const {open, handleClose} = prop;
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ITicket>();
    const onSubmit = (data:ITicket) => {
        setTicket({...data,received:Date.now(),status:"pending",id:Math.round(Math.random()*10000000),isClose:false })
        reset({
            title: "",
            message: ""
          });
        handleClose()
    }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id="ticket">
                <Email className='m-2' color='info' />
                ایجاد تیکت جدید
            </DialogTitle>
            <DialogContent>
            <Box className='flex flex-col justify-between'>                
                <Box className='m-4' >
                    <TextField fullWidth label="عنوان تیکت" required   placeholder="Title" {...register("title",{required:true})} />
                </Box>
                <Box className='m-4' >
                    <TextField fullWidth label="متن تیکت" required rows={5} multiline className='mt-4' placeholder="Message" {...register("message",{required:true})} />
                </Box>
                {errors.message && <span className='text-sm text-red-500' >
                    This field is required
                    </span>
                }                
            </Box>
            </DialogContent>
            <DialogActions className='m-4 flex justify-between ' >
                <Button color='info'  onClick={handleClose}>کنسل</Button>
                <Button type='submit' color='error' variant='contained' autoFocus>
                ارسال تیکت
                </Button>
            </DialogActions>
            </form>
        </Dialog>
    )
}
export default AddTicket