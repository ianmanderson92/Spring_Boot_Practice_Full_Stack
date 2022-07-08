import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper, Button } from '@mui/material';

export default function BasicTextFields() {
    const paperStyle = {padding: '50px 20px', width:600, margin:"20px auto"}
    const[name,setName]=React.useState('')
    const[address,setAddress]=React.useState('')
    const[students,setStudents]=React.useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
    }).then(()=>{
        console.log("New student added from webpage")
    })
}

React.useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res=>res.json())
    .then((result)=>{
        setStudents(result);
    }
)},[])

  return (
    <Container>
        <Paper elevation = {3} style={paperStyle}>
            <h1 style={{color:"blue"}}>Add New Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}/>
      <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}/>
      <Button variant="contained" onClick={handleClick}>Submit</Button>
    </Box>
    </Paper>

    <h1>Current Students</h1>
    <Paper elevation = {3} style={paperStyle}>
        {students.map(student=>(
            <Paper elevation = {6} style={{margin:"10px", padding:"15px", textAlign:"left"}}>
            ID:  {student.id}<br/>
            Name:  {student.name}<br/>
            Address:  {student.address}<br/>
            </Paper>
        ))
    }
    </Paper>
    </Container>
  );
}
