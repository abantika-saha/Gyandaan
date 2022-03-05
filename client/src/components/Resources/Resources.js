import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Resources = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  if (!user) {
    history.push("/auth");
  }
  const { t, i18n } = useTranslation();
  console.log(user?.result.year);
  const userYear = user?.result.year;
  const classes = useStyles();
  const open = useSelector((state) => state.open);

  return (
    <div className={open ? classes.root : null}>
      {user ? (
        user.result.hasOwnProperty("classRange") ? (
          <Typography variant="h1" style={{ textAlign: "center" }}>
            <strong>{t("Resources are available only for students")}</strong>
          </Typography>
        ) : (
          <div>
            <Typography variant="h2" style={{ textAlign: "center" }}>
              <strong>{t("Resources")}</strong>
            </Typography>
            <br />
            <Typography variant="h4" style={{ textAlign: "center" }}>
              {t(
                `Below are the folders which contains PDFs of NCERT books of different subjects in class ${userYear}`
              )}
            </Typography>
            <br />
            <Typography variant="h5" style={{ textAlign: "center" }}>
              {t(
                "You can refer to these books to get in-depth knowledge about the subjects anytime"
              )}
            </Typography>
            <br />
            {userYear == 1 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1vtSUGxThbdLtAAwfDXlIKG_yJEOUcI-6#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 2 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1vtSUGxThbdLtAAwfDXlIKG_yJEOUcI-6#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 3 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1OWWCWjcqkovDaIwtdVGNjx3q6toVHKer#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 4 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=10gQZdueteajb_CyuerE2maBJzulW0nHb#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 5 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=13kdWZwQNj5Rnik9bFkCQzgMEpNZeDM1P#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 6 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1TlptVY81TXqxbW4y6wEjeqiEz9bbgBF0#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 7 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1pa8nHb-RRF34ydKGCVWCLcq7dwZ-cQfh#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 8 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1Ztja-xQxNZt0GDPasTWbgMDENrF2fDyS#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 9 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=16ovW-F2cjAP07ms3ys1dy3zDleVXYkaR#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 10 ? (
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1EQJ2ZtO3yZOSXsBtYu7s_QQTIb-_dXtp#grid"
                width="100%"
                height="500"
              ></iframe>
            ) : userYear == 11 ? (
              <div>
                {" "}
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  <strong>Science:</strong>
                </Typography>{" "}
                <iframe
                  src="https://drive.google.com/embeddedfolderview?id=1TJ34i8-D7tvLtSBHS1OGU6B9Kzx8JU-d#grid"
                  width="100%"
                  height="500"
                ></iframe>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  <strong>Arts:</strong>
                </Typography>{" "}
                <iframe
                  src="https://drive.google.com/embeddedfolderview?id=1XISXmg2mBkU1wQV0VxoAUIvpEFgpSYgn#grid"
                  width="100%"
                  height="500"
                ></iframe>{" "}
              </div>
            ) : userYear == 12 ? (
              <div>
                {" "}
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  <strong>Science:</strong>
                </Typography>{" "}
                <iframe
                  src="https://drive.google.com/embeddedfolderview?id=1l60KbRelldm_tth2FSiCggHCYvjr2-ej#grid"
                  width="100%"
                  height="500"
                ></iframe>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  <strong>Arts:</strong>
                </Typography>{" "}
                <iframe
                  src="https://drive.google.com/embeddedfolderview?id=1mFx49yYOi-s6j5NEAUlbzBTtZogzwkMF#grid"
                  width="100%"
                  height="500"
                ></iframe>{" "}
              </div>
            ) : null}
          </div>
        )
      ) : null}
    </div>
  );
};

export default Resources;
