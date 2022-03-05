import axios from "axios";
import React, { useState, useEffect, useDebugValue } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMeetings } from "../../actions/meetings";


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
});

const MyMeetings = () => {
  const userDetails = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  if (!userDetails) {
    history.push("/auth");
  }
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const open = useSelector((state) => state.open);

  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings);

  const handleCancel = async (e) => {
    e.preventDefault();
    const bookingId = e.target[0].value;

    const kings = await axios.post(
      "https://gyandaan-backend.herokuapp.com/booking/cancelBooking",
      { bookingId: bookingId }
    );
    setBookings(kings.data);
    alert(t("Booking Cancelled"));
  };
  const handleRemove = async (e) => {
    e.preventDefault();
    const bookingId = e.target[0].value;

    const kings = await axios.post(
      "https://gyandaan-backend.herokuapp.com/booking/removeBooking",
      { bookingId: bookingId }
    );
    setBookings(kings.data);
    alert(t("Meeting Completed"));
  };

  useEffect(() => {
    dispatch(getMeetings(user.result._id));
    setBookings(meetings);
    console.log(bookings);
  }, [meetings]);

  return (
    <div className={open ? classes.goal : null}>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        {t("My Meetings")}
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
              {booking.status == "confirmed" && (
                <Card key={booking._id} variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {booking.subject}
                    </Typography>
                    <Typography>
                      {moment(booking.date).format("MM/DD/YYYY")} {booking.time}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {booking.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="secondary">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        target="_blank"
                        href={booking.meetLink}
                      >
                        {t("Meet Link")}
                      </a>
                    </Button>
                    <form onSubmit={handleCancel}>
                      <input
                        type="hidden"
                        name="bookingId"
                        value={booking._id}
                      />
                      <Button type="submit" size="small">
                        {t("Cancel")}
                      </Button>
                    </form>
                    <form onSubmit={handleRemove}>
                      <input
                        type="hidden"
                        name="bookingId"
                        value={booking._id}
                      />
                      <Button type="submit" size="small">
                        {t("Completed")}
                      </Button>
                    </form>
                  </CardActions>
                </Card>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default MyMeetings;
