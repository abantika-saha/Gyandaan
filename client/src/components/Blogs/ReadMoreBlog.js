import { Box, Button, Modal, Typography } from '@material-ui/core'
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import React from 'react'

function ReadMoreBlog({opening,readMore,blog,classes}) {
    const {t,i18n} = useTranslation();
    return (
            <Modal
                keepMounted
                open={opening}
                onClose={readMore}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className={classes.modal}>
                    <div style={{display:"flex",justifyContent:"space-between",margin:"1% auto"}}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            {blog.title}
                        </Typography>
                        <Button size="small" onClick={()=>readMore()}>
                            <ClearIcon/>
                        </Button>
                    </div>
                    <Typography variant='body2' color='textSecondary' style={{display:"flex"}} gutterBottom>
                        - {t("by")} {blog.creator.name}
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        {blog.body}
                    </Typography>
                </Box>
            </Modal>
    )
}

export default ReadMoreBlog
