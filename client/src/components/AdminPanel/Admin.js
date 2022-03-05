import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {useEffect,useState} from 'react';

function Admin() {
  const open = useSelector((state) => state.open);
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);

  
  useEffect(() => {

    const getComplaints = async () => {
      try {
          const infos  = await axios.get("https://gyandaan-backend.herokuapp.com/complaint");
          setData(infos.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getComplaints();
  }, []);

  // sample data
  const classes = useStyles();
  return (
    <div className={open ? classes.root : null}>
      <Typography variant="h4" style={{ textAlign: "center" }} gutterBottom>
        {t("Complains")}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#3f51b5" }}>
              <TableCell style={{ color: "white" }}>{t("S.No.")}</TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {t("Booking Id")}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {t("Volunteer Id")}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {t("Student Id")}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {t("Complain")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((data, ind) => (
              <TableRow >
                <TableCell component="th" scope="row">
                  {ind + 1}
                </TableCell>
                <TableCell align="right">{data.bookingId}</TableCell>
                <TableCell align="right">{data.volunteerId}</TableCell>
                <TableCell align="right">{data.studentId}</TableCell>
                <TableCell align="right">{data.description}</TableCell>
              </TableRow>
            ))}
               
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Admin;
