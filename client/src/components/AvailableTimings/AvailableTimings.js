import {
  TextField,
  Typography,
  Button,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import { format } from "date-fns";

const AvailableTimings = () => {
  const userDetails = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  if (!userDetails) {
    history.push("/auth");
  }
  const { t, i18n } = useTranslation();
  const [inputList, setInputList] = useState([
    { date: "", startTime: "", endTime: "", dates: "" },
  ]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [dates, setDates] = useState([{ dates: "" }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { date: "", startTime: "", endTime: "", dates: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let availableslots = [];
    inputList.map((item) => {
      let slots =
        moment(item.endTime, "HH:mm").diff(
          moment(item.startTime, "HHmm"),
          "minutes"
        ) / 30;
      let curslot = moment(item.startTime, "HH:mm").format("HH:mm");
      let temp = "";
      temp = item.date;
      temp = temp + " " + curslot;
      availableslots.push(temp);
      slots--;

      while (slots--) {
        curslot = moment(curslot, "HH:mm").add(30, "minutes").format("HH:mm");
        temp = item.date + " " + curslot;
        availableslots.push(temp);
      }
    });
    axios.post("https://gyandaan-backend.herokuapp.com/booking/availableTimeSlots", {
      availableslots,
      user,
    });

    history.push("/");
  };
  return (
    <div>
      <Typography variant="h5" style={{ textAlign: "center" }} gutterBottom>
        {t("Submit Available timings in the week")}
      </Typography>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ width: "50%", margin: "auto", padding: "1%" }}
      >
        {inputList.map((x, i) => {
          return (
            <>
              <DatePicker
                selected={x.dates}
                minDate={new Date()}
                format="yyyy-MM-dd"
                onChange={(date) => {
                  const modifydate = date.toLocaleDateString();

                  const list = [...inputList];
                  list[i]["date"] = modifydate;
                  list[i]["dates"] = date;
                  setInputList(list);
                }}
              />
              <FormControl>
                <InputLabel>{t("Start Time")}</InputLabel>
                <Select
                  native
                  onChange={(e) => handleInputChange(e, i)}
                  inputProps={{
                    name: "startTime",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"0000"}>12:00 AM</option>
                  <option value={"0030"}>12:30 AM</option>
                  <option value={"0100"}>01:00 AM</option>
                  <option value={"0130"}>01:30 AM</option>
                  <option value={"0200"}>02:00 AM</option>
                  <option value={"0230"}>02:30 AM</option>
                  <option value={"0300"}>03:00 AM</option>
                  <option value={"0330"}>03:30 AM</option>
                  <option value={"0400"}>04:00 AM</option>
                  <option value={"0430"}>04:30 AM</option>
                  <option value={"0500"}>05:00 AM</option>
                  <option value={"0530"}>05:30 AM</option>
                  <option value={"0600"}>06:00 AM</option>
                  <option value={"0630"}>06:30 AM</option>
                  <option value={"0700"}>07:00 AM</option>
                  <option value={"0730"}>07:30 AM</option>
                  <option value={"0800"}>08:00 AM</option>
                  <option value={"0830"}>08:30 AM</option>
                  <option value={"0900"}>09:00 AM</option>
                  <option value={"0930"}>09:30 AM</option>
                  <option value={"1000"}>10:00 AM</option>
                  <option value={"1030"}>10:30 AM</option>
                  <option value={"1100"}>11:00 AM</option>
                  <option value={"1130"}>11:30 AM</option>
                  <option value={"1200"}>12:00 PM</option>
                  <option value={"1230"}>12:30 PM</option>
                  <option value={"1300"}>01:00 PM</option>
                  <option value={"1330"}>01:30 PM</option>
                  <option value={"1400"}>02:00 PM</option>
                  <option value={"1430"}>02:30 PM</option>
                  <option value={"1500"}>03:00 PM</option>
                  <option value={"1530"}>03:30 PM</option>
                  <option value={"1600"}>04:00 PM</option>
                  <option value={"1630"}>04:30 PM</option>
                  <option value={"1700"}>05:00 PM</option>
                  <option value={"1730"}>05:30 PM</option>
                  <option value={"1800"}>06:00 PM</option>
                  <option value={"1830"}>06:30 PM</option>
                  <option value={"1900"}>07:00 PM</option>
                  <option value={"1930"}>07:30 PM</option>
                  <option value={"2000"}>08:00 PM</option>
                  <option value={"2030"}>08:30 PM</option>
                  <option value={"2100"}>09:00 PM</option>
                  <option value={"2130"}>09:30 PM</option>
                  <option value={"2200"}>10:00 PM</option>
                  <option value={"2230"}>10:30 PM</option>
                  <option value={"2300"}>11:00 PM</option>
                  <option value={"2330"}>11:30 PM</option>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>{t("End Time")}</InputLabel>
                <Select
                  native
                  onChange={(e) => handleInputChange(e, i)}
                  inputProps={{
                    name: "endTime",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"0000"}>12:00 AM</option>
                  <option value={"0030"}>12:30 AM</option>
                  <option value={"0100"}>01:00 AM</option>
                  <option value={"0130"}>01:30 AM</option>
                  <option value={"0200"}>02:00 AM</option>
                  <option value={"0230"}>02:30 AM</option>
                  <option value={"0300"}>03:00 AM</option>
                  <option value={"0330"}>03:30 AM</option>
                  <option value={"0400"}>04:00 AM</option>
                  <option value={"0430"}>04:30 AM</option>
                  <option value={"0500"}>05:00 AM</option>
                  <option value={"0530"}>05:30 AM</option>
                  <option value={"0600"}>06:00 AM</option>
                  <option value={"0630"}>06:30 AM</option>
                  <option value={"0700"}>07:00 AM</option>
                  <option value={"0730"}>07:30 AM</option>
                  <option value={"0800"}>08:00 AM</option>
                  <option value={"0830"}>08:30 AM</option>
                  <option value={"0900"}>09:00 AM</option>
                  <option value={"0930"}>09:30 AM</option>
                  <option value={"1000"}>10:00 AM</option>
                  <option value={"1030"}>10:30 AM</option>
                  <option value={"1100"}>11:00 AM</option>
                  <option value={"1130"}>11:30 AM</option>
                  <option value={"1200"}>12:00 PM</option>
                  <option value={"1230"}>12:30 PM</option>
                  <option value={"1300"}>01:00 PM</option>
                  <option value={"1330"}>01:30 PM</option>
                  <option value={"1400"}>02:00 PM</option>
                  <option value={"1430"}>02:30 PM</option>
                  <option value={"1500"}>03:00 PM</option>
                  <option value={"1530"}>03:30 PM</option>
                  <option value={"1600"}>04:00 PM</option>
                  <option value={"1630"}>04:30 PM</option>
                  <option value={"1700"}>05:00 PM</option>
                  <option value={"1730"}>05:30 PM</option>
                  <option value={"1800"}>06:00 PM</option>
                  <option value={"1830"}>06:30 PM</option>
                  <option value={"1900"}>07:00 PM</option>
                  <option value={"1930"}>07:30 PM</option>
                  <option value={"2000"}>08:00 PM</option>
                  <option value={"2030"}>08:30 PM</option>
                  <option value={"2100"}>09:00 PM</option>
                  <option value={"2130"}>09:30 PM</option>
                  <option value={"2200"}>10:00 PM</option>
                  <option value={"2230"}>10:30 PM</option>
                  <option value={"2300"}>11:00 PM</option>
                  <option value={"2330"}>11:30 PM</option>
                </Select>
              </FormControl>
              {inputList.length - 1 === i && (
                <Button
                  onClick={handleAddClick}
                  variant="outlined"
                  color="secondary"
                >
                  {t("Add")}
                </Button>
              )}
            </>
          );
        })}

        <div style={{ textAlign: "center" }}>
          <Button
            style={{ margin: "5px" }}
            type="submit"
            size="small"
            color="primary"
            variant="contained"
          >
            {t("Submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AvailableTimings;
