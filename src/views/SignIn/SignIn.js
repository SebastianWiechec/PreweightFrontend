/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api, { API_TYPES } from "../../actions/api";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Colgate-Palmolive 
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(../colgate.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let user;
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    user = {
      Email: email,
      Password: password,
      
    };
    localStorage.setItem("user", "0");
    try {
    await api
    .request(API_TYPES.USER)
    .userLogin(user)
    .then((respose) => {
      localStorage.setItem("user", user.Email);
      localStorage.setItem("userId", respose.data.id);
      localStorage.setItem("token", respose.data.token);
      localStorage.setItem("role", "User");
      //localStorage.setItem("role", respose.data.role);     
    }
    );
    Setrole();
    } 
    catch (error) {
      alert("Brak użytkownika w bazie - spróbuj jeszcze raz");
      props.history.push("/");
    }
    }
    
    const Setrole = async () => {
        
      let userOld = await api.request(API_TYPES.USER).fetchById("/" + localStorage.userId)
      if (userOld.data.PhoneNumber){
            if (userOld.data.PhoneNumber=="2"){
              localStorage.setItem("role", "Admin");
            }
            else{
              localStorage.setItem("role", "User");
            }     
      }
      props.history.push(`/admin/dashboard/${localStorage.userId}`)
    }

    const classes = useStyles();
 
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zaloguj się
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adres Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              data-testid="Hasło"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password" // do testów niezbędne zakomentowanie
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj hasło"
            />
            <Button
              fullWidth
              variant="contained"
              color={"primary"}
              className={classes.submit}
              type="submit"
              disabled={!validateForm()}
              onClick={(event) => handleSubmit(event)}
            >
              Zaloguj się
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Nie masz konta? Zarejestruj się."}
                </Link>
              </Grid>
            </Grid>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
