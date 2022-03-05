import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSnack from './LoginSnack';
import TopVolunteers from '../VolunteerLeaderboard/TopVolunteers'
import { useTranslation } from 'react-i18next';


const Home = () => {
    const classes = useStyles();
    const {t,i18n}=useTranslation();
    const history = useHistory();
    const open = useSelector((state)=>state.open);
    const [ok,setOk]=useState(true);
    const [info,setInfo]=useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(()=>{
        if(!info){
            history.push("/auth");
        }
    },[info])
    
    return (
        <div className={open?classes.root:null} style={{display:"flex",justifyContent:"space-around"}}>
        <div>
        <Carousel className={classes.centered} autoPlay={true} infiniteLoop={true} showArrows={false} stopOnHover={true} >
            <Paper>
                <img src={require("../../images/Available_Timings.png")}/>
                <p className="legend">{t("Available Timings")}</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Blogs.png")}/>
                <p className="legend">{t("Blogs")}</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Book_Slot.png")}/>
                <p className="legend">{t("Book Slots")}</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Discussion.png")}/>
                <p className="legend">{t("Discussion")}</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Leaderboard.png")}/>
                <p className="legend">{t("Leaderboard")}</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Resources.png")}/>
                <p className="legend">{t("Resources")}</p>
            </Paper>
          </Carousel>
          <LoginSnack info={info} ok={ok} setOk={setOk} />
          </div>
          <div style={{flex:"0 0 40%"}}>
          <TopVolunteers></TopVolunteers>
          </div>
      </div>
  );
};

export default Home;
