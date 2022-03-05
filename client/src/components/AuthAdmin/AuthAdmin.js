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
import { signina, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
    email: "",
    password: "",
    userType: "admin",
};

const AuthAdmin = () => {
    const { t, i18n } = useTranslation();
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    let location = useLocation();

   

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);

      
            dispatch(signina(form, history));
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
                    {  t("Sign In") }
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        
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
                        
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        { t("Sign In")}
                    </Button>
                    
                </form>
            </Paper>
        </Container>
    );
};

export default AuthAdmin;
