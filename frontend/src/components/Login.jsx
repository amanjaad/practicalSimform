import { FormGroup , FormControl , Input , InputLabel , Button , makeStyles , Typography } from "@material-ui/core";
import {useState} from "react";
//import { addUser } from "../Service/api";
import {Link} from "react-router-dom";
import {userSignIn} from '../service/api';
import { AccountContext } from "../context/AccountProvider";
import { useContext } from "react";
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
    textDecoration:'none'
  }
})

const initialValues = {
  email:"",
  password:"",
}

const Login = () => {
  const classes = useStyles();
    const [user , setUser] = useState(initialValues);
    const {account , setAccount} = useContext(AccountContext);
    const { email , password } = user;
    const navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({...user , [e.target.name] : e.target.value});
        console.log(user);
    }
    const login = async () => {
        const response = await userSignIn(user);
       // console.log(response.data);
        setAccount(response.data);
        navigate("/userdetails");
    } 
    
  return (
    <FormGroup className={classes.container}>
    <Typography variant="h4" style={{margin:'auto', color:'GrayText'}}>LOGIN</Typography>
    <FormControl>
        <InputLabel>Email</InputLabel>
        <Input onChange = {(e) => onValueChange(e)} name = "email" />
    </FormControl>
    <FormControl>
        <InputLabel required={true}>Password</InputLabel>
        <Input onChange = {(e) => onValueChange(e)} name = "password" />
    </FormControl>
    <div style={{display:'flex'}}>
    <Button className={classes.btn} variant="contained" color="primary" onClick={() => login()}>sign in</Button>
    <Link to='/signup'>
    <Button className={classes.btn} variant="contained" color="secondry">sign up</Button>
    </Link>
    </div>
</FormGroup>
  );
}

export default Login;
