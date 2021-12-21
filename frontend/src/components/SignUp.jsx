import { FormGroup , FormControl , Input , InputLabel , Button , makeStyles , Typography } from "@material-ui/core";
import {useState} from "react";
import FileBase from "react-file-base64";
import {registration} from '../service/api';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    container:{
        width:"50%",
        margin:"5% 0 0 25%",
        "& > *":{
            marginTop:20
        }
    },
    btn:{
      margin:'auto',
      marginTop:'50px'
    },
    fileInput: {
        width: "97%",
        margin: "10px 0",
      },
  })

  const initialValues = {
      firstname:"",
      lastname:"",
    email:"",
    password:"",
    selectedFile:""
  }

const SignUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [user , setUser] = useState(initialValues);
    const {firstname , lastname , email , password} = user;

    const onValueChange = (e) => {
        setUser({...user , [e.target.name] : e.target.value});
        
    }
    const signup = async () => {
        console.log(user);
        await registration(user);
        navigate('/userDetails')
       // history.push("/all");
    }
    return (
        <FormGroup className={classes.container}>
        <Typography variant="h4" style={{margin:'auto', color:'GrayText'}}>SIGN UP</Typography>
        <FormControl>
            <InputLabel required={true}>First Name</InputLabel>
            <Input required={true} onChange = {(e) => onValueChange(e)} name = "firstname" />
        </FormControl>
        <FormControl>
            <InputLabel>Last Name</InputLabel>
            <Input onChange = {(e) => onValueChange(e)} name = "lastname" />
        </FormControl>
        <FormControl>
            <InputLabel>Email</InputLabel>
            <Input onChange = {(e) => onValueChange(e)} name = "email" />
        </FormControl>
        <FormControl>
            <InputLabel>Password</InputLabel>
            <Input onChange = {(e) => onValueChange(e)} name = "password" />
        </FormControl>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setUser({ ...user, selectedFile: base64 })
            }
          />
        </div>
        <Button className={classes.btn} variant="contained" color="primary" onClick={() => signup()}>sign in</Button>
    </FormGroup>
    )
}

export default SignUp;