import { useDispatch,useSelector } from "react-redux"
import { Grid,Button,TextField, DialogContent, DialogActions,Dialog,DialogTitle,Avatar } from "@mui/material"
import { useState } from "react"
import { makeStyles } from "@mui/styles"
import { UploadFile } from "@mui/icons-material"
import MaterialTable from "@material-table/core"
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
        width:'70%',
        height:'auto',
        background:'#fff',
        padding:20,
    }
})


export default function DisplayAll()
{   
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [shareId,setShareId]=useState('')
    const [companyName,setCompanyName]=useState('')
    const [todayDate,setTodayDate]=useState('')
    const [open,setOpen]=useState('')
    const [close,setClose]=useState('')
    const [companyLogo,setCompanyLogo]=useState({url:'',bytes:''})
    const [openDialog,setOpenDialog]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const share=useSelector((state)=>state.shareData)
    var sh = Object.values(share)
    console.log("VALUES",sh)

    const handleDelete=(rowData)=>{
        dispatch({type:'DEL_SHARE',payload:[rowData.shareid]})
        setRefresh(!refresh)
    }

    const handleEdit=(rowData)=>{
        setShareId(rowData.shareid)
        setCompanyName(rowData.companyname)
        setTodayDate(rowData.todaydate)
        setOpen(rowData.open)
        setClose(rowData.close)
        setCompanyLogo({url:rowData.companylogo.url,bytes:''})
        setOpenDialog(true)
        
    }

    const handleDialogClose=()=>{
      setOpenDialog(false)
  }

  const handleEditData=()=>{
    var body={"shareid":shareId,"companyname":companyName,"todaydate":todayDate,"open":open,"close":close,"companylogo":companyLogo}
    dispatch({type:"EDIT_SHARE",payload:[shareId,body]})
    setRefresh(!refresh)
}

const handleCompanyLogo=(event)=>{
    setCompanyLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}


  const showData=()=>{
    return(<div >
      <div >
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <div style={{fontSize:24,fontWeight:'bold'}}>Share Interface</div>
              </Grid>
              <Grid item xs={6}>
                  <TextField value={shareId} label="Share Id" fullWidth onChange={(e)=>setShareId(e.target.value)}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField value={companyName} label="Company Name" fullWidth onChange={(e)=>setCompanyName(e.target.value)}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField value={todayDate} type="date" fullWidth onChange={(e)=>setTodayDate(e.target.value)}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField value={open} label="Open" fullWidth onChange={(e)=>setOpen(e.target.value)}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField value={close} label="Close" fullWidth onChange={(e)=>setClose(e.target.value)}/>
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
                  <Button onClick={handleEditData} fullWidth variant="contained">Submit</Button>
              </Grid>
              
              
          </Grid>
      </div>
  </div>)
  }
  
  const showDialog=()=>{
      return(<div>
          <Dialog open={openDialog}>
              <DialogTitle>
                  {showData()}
              </DialogTitle>
              <DialogContent>

              </DialogContent>
              <DialogActions>
                  <Button onClick={handleDialogClose}>Close</Button>
              </DialogActions>
          </Dialog>
      </div>)
  }


    const showAllShare=()=>{
        return (
          <MaterialTable
            title="Multiple Actions Preview"
            columns={[
              { title: 'Shareid', field: 'shareid' },
              { title: 'Company Name', field: 'companyname' },
              { title: 'Date', field: 'todaydate' },
              { title: 'Open', field: 'open' },
              { title: 'Close', field: 'close' },
              { title: 'Logo', render: rowData=> <><div><img src={rowData.companylogo.url} style={{width:30,height:30}} /></div></> },
             
            ]}
            data={sh}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Share',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Share',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Share',
                isFreeAction: true,
                onClick: (event, rowData) => navigate('/shareinterface')
              }
            ]}
          />
        )
    }



    return(<div className={classes.root}>
        <div className={classes.box}>
            {showAllShare()}

            {showDialog()}
            
        </div>
    </div>)
}