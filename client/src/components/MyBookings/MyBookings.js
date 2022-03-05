import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Modal, Box, TextField } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  goal: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50rem",
    height: "30rem",
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    padding: "1rem",
    overFlowY: "scroll",
  },
});

const options = ["report"];
const ITEM_HEIGHT = 48;

const MyBookings = () => {
  const userDetails = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  if (!userDetails) {
    history.push("/auth");
  }
  const { t, i18n } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const open = useSelector((state) => state.open);
  const [anchorEl, setAnchorEl] = useState(null);
  const opena = Boolean(anchorEl);
  const [openm, setOpenm] = useState(false);

  const handleOpenm = () => {
    setOpenm(true);
  };

  const handleClosem = () => {
    setOpenm(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseo = () => {
    handleOpenm();
    setAnchorEl(null);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    const bookingId = e.target[0].value;

    const kings = await axios.post(
      "https://gyandaan-backend.herokuapp.com/booking/removesBooking",
      { bookingId: bookingId }
    );
    setBookings(kings.data);
  };
  const reportHandler = async (e) => {
    e.preventDefault();

    const bookingId = e.target[0].value;
    const studentId = e.target[2].value;
    const volunteerId = e.target[1].value;
    const description = e.target[3].value;

    const complaint = { bookingId, studentId, volunteerId, description };

    const response = await axios.post(
      "https://gyandaan-backend.herokuapp.com/complaint",
      complaint
    );
    handleClosem();
    alert("Your complaint has been submitted");
  };

  useEffect(() => {
    const getBookings = async () => {
      const bkings = await axios.get(
        `https://gyandaan-backend.herokuapp.com/booking/getBookings?userId=${user.result._id}`
      );

      setBookings(bkings.data);
    };
    getBookings();
  }, [bookings]);

  return (
    <div className={open ? classes.goal : null}>
      <Typography variant="h3" style={{ textAlign: "center" }} gutterBottom>
        {t("My Bookings")}
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexBasis: "25%",
          width: "100%",
        }}
      >
        {bookings.map((booking) => {
          return (
            <>
              {(booking.status == "cancelled" ||
                booking.status == "confirmed" ||
                booking.status == "completed") && (
                <Card
                  className={classes.root}
                  key={booking._id}
                  variant="outlined"
                  style={{ margin: "1%" }}
                >
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {booking.subject}
                    </Typography>
                    <Typography color="textSecondary">
                      {moment(booking.date).format("MM/DD/YYYY")} {booking.time}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {booking.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {booking.status != "cancelled" && (
                      <Button variant="contained" color="secondary">
                        <a
                          style={{ textDecoration: "none", color: "white" }}
                          target="_blank"
                          href={booking.meetLink}
                        >
                          {t("Meet Link")}
                        </a>
                      </Button>
                    )}
                    {booking.status == "cancelled" && (
                      <div>
                        <div style={{ color: "red" }}>{t("Canceled")}</div>
                        <form onSubmit={handleCancel}>
                          <input
                            type="hidden"
                            name="bookingId"
                            value={booking._id}
                          />
                          <Button type="submit" size="small">
                            {t("Remove")}
                          </Button>
                        </form>
                      </div>
                    )}
                    {booking.status == "completed" && (
                      <div>
                        <div style={{ color: "red" }}>{t("Completed")}</div>
                        <form onSubmit={handleCancel}>
                          <input
                            type="hidden"
                            name="bookingId"
                            value={booking._id}
                          />
                          <Button type="submit" size="small">
                            {t("Remove")}
                          </Button>
                        </form>
                      </div>
                    )}
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={opena}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          onClick={handleCloseo}
                        >
                          {t(option)}
                        </MenuItem>
                      ))}
                    </Menu>
                  </CardActions>
                  <Modal
                    open={openm}
                    onClose={handleClosem}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <Box className={classes.modal} style={{ height: "50vh" }}>
                      <form onSubmit={reportHandler}>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking._id}
                        />
                        <input
                          type="hidden"
                          name="volunteerId"
                          value={booking.volunteerId}
                        />
                        <input
                          type="hidden"
                          name="studentId"
                          value={booking.studentId}
                        />

                        <TextField
                          style={{ margin: "7px" }}
                          variant="standard"
                          placeholder={t("Complaint")}
                          label={t("Complaint")}
                          fullWidth
                        />
                        <br />
                        <Button
                          style={{ margin: "5px" }}
                          size="small"
                          type="submit"
                          variant="outlined"
                          color="primary"
                        >
                          {t("Submit")}
                        </Button>
                      </form>
                    </Box>
                  </Modal>
                </Card>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default MyBookings;
