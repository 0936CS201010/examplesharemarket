import { useDispatch } from "react-redux"
import { Grid,Button,TextField,Avatar } from "@mui/material"
import { useState } from "react"
import { makeStyles } from "@mui/styles"
import { UploadFile } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
    root:{
        background:"#dfe6e9",
        width:'100vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        width:'50%',
        height:'auto',
        background:'#fff',
        padding:20,
    }
})
export default function ShareInterface()
{   const classes = useStyles()
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const [shareId,setShareId]=useState('')
    const [companyName,setCompanyName]=useState('')
    const [todayDate,setTodayDate]=useState('')
    const [open,setOpen]=useState('')
    const [close,setClose]=useState('')
    const [companyLogo,setCompanyLogo]=useState({url:'',bytes:''})

    const handleSubmit=()=>{
        var body={"shareid":shareId,"companyname":companyName,"todaydate":todayDate,"open":open,"close":close,"companylogo":companyLogo}
        dispatch({type:"ADD_SHARE",payload:[shareId,body]})
    }

    const handleCompanyLogo=(event)=>{
        setCompanyLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{fontSize:24,fontWeight:'bold'}}>Share Interface</div>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Share Id" fullWidth onChange={(e)=>setShareId(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Company Name" fullWidth onChange={(e)=>setCompanyName(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="date" fullWidth onChange={(e)=>setTodayDate(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Open" fullWidth onChange={(e)=>setOpen(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Close" fullWidth onChange={(e)=>setClose(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                    <Button component="label" fullWidth variant="contained" endIcon={<UploadFile/>}>
                        <input hidden type="file" accept="image/*" multiple onChange={handleCompanyLogo} />
                        Upload Company Logo</Button>
                </Grid>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Avatar
                    alt="Logo"
                    src={companyLogo.url}
                    sx={{ width: 56, height: 56 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={()=>navigate('/displayall')}  fullWidth variant="contained">Display</Button>
                </Grid>
            </Grid>
        </div>
    </div>)
}