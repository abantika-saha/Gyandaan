import React, { useState } from 'react'
import { Box, Button, Modal, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { updateBlogs } from '../../actions/blog';
import { useTranslation } from 'react-i18next';

function Updateblogs({opening,handleUpdate,blog,classes}) {
    const {t,i18n} = useTranslation();
    const dispatch = useDispatch();
    const [uBlog,setUBlog]=useState(blog);
    const update = (e)=>{
        e.preventDefault();
        const structBlog = {
            title: uBlog.title,
            body: uBlog.body,
            year: uBlog.year,
            subject: uBlog.subject,
            creator: blog.creator,
            upvotes: blog.upvotes,
            upvoteList: blog.upvoteList
        }
        console.log("this is the original",blog);
        dispatch(updateBlogs(structBlog,blog._id));
        handleUpdate();
    }
    return (
            <Modal
                keepMounted
                open={opening}
                onClose={handleUpdate}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >   
                <Box className={classes.modal} style={{height:"50vh"}}>
                    <form onSubmit={(e)=>update(e)}>
                        <TextField style={{margin:"7px"}} value={uBlog.title} onChange={(e)=>setUBlog({...uBlog,title:e.target.value})} variant="standard" placeholder='Title' label={t("Title")} fullWidth/><br/>
                        <TextField style={{margin:"7px"}} value={uBlog.body} onChange={(e)=>setUBlog({...uBlog,body:e.target.value})} variant="standard" placeholder='Body' label={t("Body")} multiline fullWidth rows={4}/><br/>
                        <TextField style={{margin:"7px"}} value={uBlog.year} onChange={(e)=>setUBlog({...uBlog,year:e.target.value})} variant="standard" placeholder='Year'  label={t("Year")} type="number" fullWidth/><br/>
                        <TextField style={{margin:"7px"}} value={uBlog.subject} onChange={(e)=>setUBlog({...uBlog,subject:e.target.value})} variant="standard" placeholder='Subject' label={t("Subject")} fullWidth/><br/>
                        <Button style={{margin:"5px"}} size="small" type="submit" variant='outlined' color="primary">{t("Modify")}</Button>
                        <Button style={{margin:"5px"}} size="small" onClick={()=>handleUpdate()} variant="outlined" color="secondary">{t("Cancel")}</Button>
                     </form>
                </Box>
            </Modal>
    )
}

export default Updateblogs
