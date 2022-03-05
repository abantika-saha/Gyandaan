import React,{useState} from 'react'
import useStyles from './styles'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { createBlogs } from '../../actions/blog';
import { useTranslation } from 'react-i18next';
function Createblogs() {
    const history= useHistory();
    const {t,i18n}=useTranslation();
    const info = JSON.parse(localStorage.getItem('profile'));
    const name = info?info.result.name:"guest";
    const id = info?info.result._id:"0";
    const initialState={
        title: "",
        body: "",
        year: "",
        subject:"",
        creator:{name,id},
        upvotes:0
    }

    const [blog,setBlog]=useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();

    const open = useSelector((state)=>state.open);

    if(!info){
        history.push("/auth");
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(blog.title&&blog.body&&blog.year&&blog.subject){
            dispatch(createBlogs(blog));
            setBlog(initialState);
            history.push("/blogs");
        }
    }
    return (
        <div className={open?classes.root:null}>
            {info.result.hasOwnProperty('classRange')?<div><Typography variant="h5" style={{textAlign:"center"}} gutterBottom>{t("Create a Blog")}</Typography>
            <form onSubmit={(e)=>handleSubmit(e)} style={{width:"50%" ,margin:"auto",padding:"1%"}}>
                <TextField style={{margin:"10px"}} type="text" name="title" onChange={(e)=>setBlog({...blog,title:e.target.value})} value={blog.title} placeholder={t("Title")} fullWidth/><br/>
                <TextField style={{margin:"10px"}} type="text" name="body" onChange={(e)=>setBlog({...blog,body:e.target.value})} value={blog.body} placeholder={t("Body")} multiline fullWidth rows={4}/><br/>
                <TextField style={{margin:"10px"}} type="text" name="year" onChange={(e)=>setBlog({...blog,year:e.target.value})} value={blog.year} placeholder={t("Year")} fullWidth/><br/>
                <TextField style={{margin:"10px"}} type="text" name="subject" onChange={(e)=>setBlog({...blog,subject:e.target.value})} value={blog.subject} placeholder={t("Subject")} fullWidth/><br/>
                <div style={{textAlign:"center"}}>
                    <Button style={{margin:"5px"}} type='submit' size="small" color="primary" variant="contained">{t("Submit")}</Button>
                </div>
            </form></div>:<Typography variant='h4' style={{textAlign:"center"}}>{t("Only Volunteers can write blogs")}</Typography>}     
        </div>
    )
}

export default Createblogs
