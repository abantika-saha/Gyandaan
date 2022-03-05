import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getDoubt } from "../../actions/doubts";
import CommentSection from './CommentSection';
import useStyles from "./styles";
import { useTranslation } from "react-i18next";


const Doubt = () => {
  const { doubt, doubts, isLoading } = useSelector((state) => state.doubts);
  const {t,i18n}=useTranslation();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const open = useSelector((state)=>state.open);
  
  useEffect(() => {
      console.log(id);
    dispatch(getDoubt(id));
  }, [id]);


  if (!doubt) return null;


//   if (isLoading) {
//     return (
//       <Paper elevation={6}>
//         <CircularProgress size="2em" />
//       </Paper>
//     );
//   }
  //console.log(doubt);
  
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6} className={open?classes.root:null}>
    <div>
      <div>
        <Typography variant="h3" component="h2">
          {doubt.question}
        </Typography>
        <Typography variant="h6">{t("Asked by")}: {doubt.name}</Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1">
        <CommentSection doubt={doubt} />
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
      </div>
    </div>
    </Paper>
  );
};

export default Doubt;
