import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton,Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import useStyles from './styles';
import React, { useEffect, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import ReadMoreBlog from './ReadMoreBlog';
import Updateblogs from './Updateblogs';
import { useDispatch } from 'react-redux';
import { deleteBlogs, likeBlogs } from '../../actions/blog';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Blog({blog,id,name}) {
    const {t,i18n}=useTranslation();
    const classes = useStyles();
    const blogUpList=blog.upvoteList;
    const [liked,setLiked]=useState(blogUpList?(blogUpList.includes(id)?true:false):false);
    const [opening,setOpening]=useState(false);
    const [updateOpen,setUpdateOpen]=useState(false);
    const dispatch = useDispatch();


    const upvote = ()=>{
        setLiked(true);
        const list = [...blog.upvoteList,id];
        const structBlog = {
            title: blog.title,
            body: blog.body,
            year: blog.year,
            subject: blog.subject,
            creator: blog.creator,
            upvotes: blog.upvotes,
            upvoteList: list
        }

        if(!liked){
            dispatch(likeBlogs(structBlog,blog._id));
        }
    }

    const readMore = ()=>{
        setOpening(!opening);
    }

    const handleUpdate = ()=>{
        setUpdateOpen(!updateOpen)
    }

    const handleDelete = ()=>{
       dispatch(deleteBlogs(blog._id));
    }

    return (
        <div style={{margin:"5px",flexBasis:"20%"}}>
            <Card className={classes.card}>
                <CardHeader
                avatar={
                    <Avatar aria-label="writer" className={classes.avatar}>
                        {blog.creator.name[0]}
                    </Avatar>
                }
                title={blog.creator.name}
                subheader={blog.subject}
                action={blog.creator.id === id ?
                    <div>
                        <IconButton aria-label="edit" color="primary" onClick={()=>handleUpdate()}>
                            <EditOutlinedIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" className={classes.delete} onClick={()=>handleDelete()}>
                            <DeleteOutlineOutlined/>
                        </IconButton>
                    </div>:null
                }
                >
                </CardHeader>
                <CardContent>
                    <Typography className={classes.pos} color="textSecondary" gutterBottom variant="h5">
                        {blog.title}
                    </Typography>
                    <Typography variant="body2" component="p" noWrap style={{overFlow:"hidden",textOverflow: "ellipsis"}}>
                        {blog.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>upvote()} style={{color:"#3278fa"}}>
                        {!liked?<ThumbUpOutlinedIcon/>:<ThumbUpAltIcon/>}&nbsp;
                        {t("Upvote")}&nbsp;{blog.upvotes}
                    </Button>
                    <Button size="small" onClick={()=>readMore()}>{t("Read More")}</Button>
                    <ReadMoreBlog opening={opening} readMore={readMore} blog={blog} classes={classes}/>
                    <Updateblogs opening={updateOpen} handleUpdate={handleUpdate} blog={blog} classes={classes}/>
                </CardActions>
            </Card>
        </div>
    )
}

export default Blog
