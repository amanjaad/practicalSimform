import { AccountContext } from "../context/AccountProvider";
import { useContext } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const UserDetails = () => {
    const {account , setAccount} = useContext(AccountContext);
    console.log(account);
    const navigate = useNavigate();
    const editUser =  () => {
        navigate('/editUser');
    }
    useEffect(() => {
        setAccount(account);
    },[account.firstname]);
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              image={account.selectedFile}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {account.firstname + " "+ account.lastname}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => editUser()}>
              Edit
            </Button>
          </CardActions>
        </Card>
      );
    }
export default UserDetails;