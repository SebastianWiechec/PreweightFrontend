/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Typography from "@material-ui/core/Typography";

import image from '../../assets/img/colgate.jpg';



export default function DashboardAdmin(props) {

  return (
    <div>
      <GridContainer>
       
        <GridItem xs={12} sm={6} md={6}>
        Wybierz opcję z menu
        </GridItem>
      </GridContainer>
      <GridContainer>
     
        <GridItem >
        <Typography paragraph></Typography>
        <Typography paragraph></Typography>
          <img src={image} />
        </GridItem>
      </GridContainer>
     </div>
  );
}
