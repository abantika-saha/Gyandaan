import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useTranslation } from "react-i18next";

import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  year: "",
  userType: "",
};

const AuthStudent = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  let location = useLocation();

  const userType = location.pathname.split("/auth/")[1];
  useEffect(() => {
    setForm({ ...form, userType: userType });
  }, [userType]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);

    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? t("Sign Up") : t("Sign In")}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="name"
                  label={t("Name")}
                  handleChange={handleChange}
                  autoFocus
                />
                <Input
                  name="year"
                  label="Year"
                  handleChange={handleChange}
                  autoFocus
                />
              </>
            )}
            <Input
              name="email"
              label={t("Email Address")}
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label={t("Password")}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label={t("Repeat Password")}
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? t("Sign Up") : t("Sign In")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? t("Already have an account? Sign in")
                  : t("Don't have an account? Sign Up")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthStudent;