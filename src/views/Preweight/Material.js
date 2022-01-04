/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import api, { API_TYPES } from "../../actions/api";
import Modal from "../../components/Modal/Modal";
import Select from "@material-ui/core/Select";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};


export default function MatProfile(props) {
  const [material, setWarehouse] = useState({ idMaterial: 0 });
  const selectedPrewId = props.match.params.id;
  const useStyles = makeStyles(styles);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleChange = (event) => {
    const name = event.target.id;
    setWarehouse({
      ...material,
      [name]: event.target.value,
    });
  };

  async function SendData() {
    material.idMaterial = parseInt(material.idMaterial);
    material.mCode
    material.name 
    material.unit

    if (material.idMaterial != 0) {
      await api.request(API_TYPES.MATERIAL).update(material.id, material, );
      setOpen(true);
    } else {
      await api.request(API_TYPES.MATERIAL).create('', material);
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPrewId != 0) {
        const request = await api
          .request(API_TYPES.MATERIAL)
          .fetchById("/" + selectedPrewId);

        setWarehouse(request.data);

      }     
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <Modal open={open} onChange={handleClose} txt={'OK'} title={"Zapisano dane"}/>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Edytuj lub dodaj pozycję</h4>
              <p className={classes.cardCategoryWhite}>Wypełnij lub edytuj pola</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
          
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="M-Kod"
                    id="mCode"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: material.mCode ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: material.mCode,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Nazwa"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: material.name ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: material.name,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ilość"
                    id="unit"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: material.unit ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: material.unit,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={SendData}>
                Update Info
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
