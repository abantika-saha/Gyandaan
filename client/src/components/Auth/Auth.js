import React from "react";
import { Button, createTheme} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/core';


const Auth = () => {


  const { t, i18n } = useTranslation();


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1%",
      }}
    >
      <Button
        component={Link}
        to="/auth/student"
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: "1%" }}
      >
        {t("Student Login")}
      </Button>
      <Button
        component={Link}
        to="/auth/volunteer"
        variant="contained"
        color="secondary"
        size="large"
        style={{ margin: "1%" }}
      >
        {t("Volunteer Login")}
      </Button>
    </div>
  );
};

export default Auth;
