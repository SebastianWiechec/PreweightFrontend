/* eslint-disable no-unused-vars */
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import api, { API_TYPES } from "../../actions/api";
import React, { useState, useEffect } from 'react';



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function logList(props) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.request(API_TYPES.SPENDINGS).fetchLogs("/" + props.match.params.id);
      setLogs(request.data);
    };

    fetchData();
  }, []);

  let newLogs = new Array();
  logs.forEach(element => {

    let timestamp;
    let level;
    let message;
    for (let [key, value] of Object.entries(element)) {
      if (key == "timestamp") {
        timestamp = value.substring(0, value.indexOf(" "));
      }
      if (key == "level") {
        level = value;
      }
      if (key == "message") {
        let mes = value.substring(0, value.indexOf(","))
        let carId = value.substring(value.lastIndexOf(","));
        message = `${mes} ${carId}`;
      }
    }
    
    newLogs.push({
      timestamp: timestamp,
      level: level,
      message: message
    })
  });

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Logi</h4>
            <p className={classes.cardCategoryWhite}>
              Lista czynności w aplikacji
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Data", "Typ logu", "Opis"]}
              tableData={newLogs}
            />
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}
