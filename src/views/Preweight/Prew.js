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


export default function PrewProfile(props) {
  const [preweight, setWarehouse] = useState({ idPreweight: 0 });
  const [materials, setMaterials] = useState();
  const [recipes, setRecipes] = useState();
  const selectedPrewId = props.match.params.id;
  const useStyles = makeStyles(styles);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleChange = (event) => {
    const name = event.target.id;
    setWarehouse({
      ...preweight,
      [name]: event.target.value,
    });
  };

  async function SendData() {
    preweight.idPreweight = parseInt(preweight.idPreweight);
    preweight.idRecipe = parseInt(preweight.idRecipe);
    preweight.idMaterial = parseInt(preweight.idMaterial);
    preweight.quantity = parseFloat(preweight.quantity);

    if (preweight.idPreweight != 0) {
      await api.request(API_TYPES.PREWEIGHT).update(preweight.id, preweight, );
      setOpen(true);
    } else {
      await api.request(API_TYPES.PREWEIGHT).create('', preweight);
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
          .request(API_TYPES.PREWEIGHT)
          .fetchById("/" + selectedPrewId);

        setWarehouse(request.data);

      }

      const recipes = await api.request(API_TYPES.RECIPE).fetchAll();
    
      const materials = await api.request(API_TYPES.MATERIAL).fetchAll();
      setMaterials(materials.data,);
      setRecipes(recipes.data);
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
                <Select
                    native
                    value={preweight.idRecipe}
                    onChange={handleChange}
                    id="idRecipe"
                    required
                    fullWidth="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{}}
                  >
                    <option aria-label="None" value="" />
                    {recipes &&  recipes.map((recipe, key) => (
                      <option key={key} value={ recipe.idRecipe ? recipe.idRecipe : recipe.idRecipe  }>
                        {recipe.name}
                      </option>
                    ))}
                  </Select>
                 
                  <Select
                    native
                    value={preweight.idMaterial}
                    onChange={handleChange}
                    id="idMaterial"
                    required
                    fullWidth="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{}}
                  >
                    <option aria-label="None" value="" />
                    {materials &&  materials.map((material, key) => (
                      <option key={key} value={ material.idMaterial ? material.idMaterial : material.idMaterial  }>
                        {material.name}
                      </option>
                    ))}
                  </Select>
                                 
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ilość"
                    id="quantity"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: preweight.quantity ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: preweight.quantity,
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
