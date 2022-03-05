import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    backgroundColor: "#3f51b5",
  },
  tableCell: {
    color: "pink",
  },
  root: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
});

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const VolunteerLeaderBoard = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  if (!user) {
    history.push("/auth");
  }
  const open = useSelector((state) => state.open);
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [volunteerLeaderboard, setVolunteerLeaderboard] = useState([]);
  useEffect(() => {
    const getVolunteerLeaderboard = async () => {
      const board = await axios.get(
        "https://gyandaan-backend.herokuapp.com/volunteerLeaderboard"
      );

      setVolunteerLeaderboard(board.data);
    };
    getVolunteerLeaderboard();
  }, []);

  return (
    <div className={open ? classes.root : null}>
      <Typography variant="h3" color="primary">
        {t("Volunteer Leaderboard")}
      </Typography>
      <br />
      <Typography variant="h4" color="primary">
        {t("Based on number of sessions taken and number of blogs posted")}
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell>
                <WhiteTextTypography variant="h5" color="common.white">
                  <strong>{t("Rank")}</strong>
                </WhiteTextTypography>
              </TableCell>
              <TableCell align="right">
                <WhiteTextTypography variant="h5" color="primary">
                  <strong>{t("Name")}</strong>
                </WhiteTextTypography>
              </TableCell>
              <TableCell align="right">
                <WhiteTextTypography variant="h5" color="primary">
                  <strong>{t("Score")}</strong>
                </WhiteTextTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteerLeaderboard
              .sort((a, b) => (a.score < b.score ? 1 : -1))
              .map((volunteerLeaderboard, i) => (
                <TableRow key={volunteerLeaderboard._id}>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6" color="primary">
                      {i + 1}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="primary">
                      {volunteerLeaderboard.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="primary">
                      {volunteerLeaderboard.score}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VolunteerLeaderBoard;
