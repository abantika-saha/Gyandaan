import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, Drawer,List,ListItem, IconButton, Box, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useHistory, useLocation ,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const {t,i18n} = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const volunteerLinks = ["/volunteer/availableTimings","/volunteer/myMeetings","/discussion","/blogs", "/volunteerLeaderboard"];
    const studentLinks = ["/student/bookMeeting","/student/myBookings","/discussion","/blogs","/leaderboard", "/resources", "/volunteerLeaderboard"];
    const [language,setLanguage]=useState(JSON.parse(localStorage.getItem('profile'))?JSON.parse(localStorage.getItem('profile')).language:"en");
    const open = useSelector((state)=>state.open);
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/auth');
        dispatch({type:"UNSET"});
        setUser(null);
    };
    const handleLang = (e)=>{
        console.log(e.target.value);
        setLanguage(e.target.value);
        let lang2=JSON.parse(localStorage.getItem('profile'));
        lang2={...lang2,language:e.target.value};
        localStorage.setItem('profile',JSON.stringify(lang2));
        i18n.changeLanguage(e.target.value);
    }

    const processLink = (s)=>{
        let res="";
        res+=s[0].toUpperCase();
        for(let i=1;i<s.length;i++){
            if(s[i].charCodeAt(0)>=65&&s[i].charCodeAt(0)<=90){
                res+=" ";
            }
            res+=s[i];
        }
        return res;
    }

    const eliminatedLinks = ["/auth","/auth/student","/auth/volunteer"];

    const handleDrawerOpen = ()=>{
        dispatch({type:"SET"});
    }
    const handleDrawerClose = ()=>{
        dispatch({type:"UNSET"});
    }
    const assign = (link)=>{
        history.push(link);
    }
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return (
        <div className={classes.root}>
            <AppBar className={`${classes.appBar} ${eliminatedLinks.includes(location.pathname)||!open?null:classes.widthChanger}`} position="static" color="inherit">  
                    <div className={classes.navBrand}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            id="open"
                            className={ (open||eliminatedLinks.includes(location.pathname)||!user)?classes.hide:null}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h5' className={classes.Header}>{t("Gyandaan")}</Typography>
                    </div>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>{t("Logout")}</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">{t("Sign In")}</Button>
                    )}
                </Toolbar>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("Language")}</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={language}
                        label="Age"
                        onChange={handleLang}
                        >
                        <MenuItem value={"en"}>{t("English")}</MenuItem>
                        <MenuItem value={"hi"}>{t("Hindi")}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </AppBar>
            <Drawer align="left" variant="persistent" classes={{paper:classes.paperWidth}} open={open}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} style={{color:"white"}}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    {user?(user.result.hasOwnProperty('classRange')?
                    volunteerLinks.map((link)=><ListItem onClick={()=>assign(link)} button style={{fontSize:"1rem"}}>{t(processLink(link.slice(1).replace("-"," ").replace("/","").replace("volunteer","")))}</ListItem>):
                    studentLinks.map((link)=><ListItem onClick={()=>assign(link)} style={{fontSize:"1rem"}} button>{t(processLink(link.slice(1).replace("-"," ").replace("/","").replace("student","")))}</ListItem>)):null}
                </List>
            </Drawer>
        </div>
    );
};

export default Navbar;