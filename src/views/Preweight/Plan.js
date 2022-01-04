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
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

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

const DateTimePickerComponent = (props) => {
  let date = "2017-05-24"
  if(typeof props.value == 'object'){
     date =props.value.toISOString().substring(0, props?.value?.toISOString().indexOf("T"));
    }else{
    date =props?.value?.indexOf("T")>0?  props?.value?.substring(0, props?.value?.indexOf("T")):props?.value;
  }

  return (
    <Container maxWidth="xl" className={props.classes.container}>
      <form className={props.classes.container} noValidate>
        <TextField
          id="date"
          label="Data"
          type="date"
          value={date}
          name="date"
          className={props.classes.textField}
          onChange={props.onChange}
          InputLabelProps={{
            shrink: true,
            onChange: props.onChange,
          }}
        />
       
      </form>
    </Container>
  );
};

export default function PlanProfile(props) {
  const [plan, setPlan] = useState({ idPlan: 0 });
  const [recipes, setRecipes] = useState();
  const selectedPlanId = props.match.params.id;
  const useStyles = makeStyles(styles);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleChange = (event) => {
    const name = event.target.id;
        setPlan({
      ...plan,
      [name]: event.target.value,
    });
  };

  async function SendData() {
    plan.idPlan = parseInt(plan.idPlan);
    plan.idRecipe = parseInt(plan.idRecipe);
    plan.quantity = parseInt(plan.quantity);
    plan.date = new Date(plan.date);
    plan.shift = String(plan.shift);


    if (plan.idPlan != 0) {
      await api.request(API_TYPES.PLAN).update(plan.id, plan, );
      setOpen(true);
    } else {
      await api.request(API_TYPES.PLAN).create('', plan);
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPlanId != 0) {
        const request = await api
          .request(API_TYPES.PLAN)
          .fetchById("/" + selectedPlanId);

        setPlan(request.data);

      }

      const recipes = await api.request(API_TYPES.RECIPE).fetchAll();
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
              <h4 className={classes.cardTitleWhite}>Edytuj/Dodaj do wykonania</h4>
              <p className={classes.cardCategoryWhite}>Wypełnij lub edytuj pola</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <Select
                    native
                    value={plan.idRecipe}
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
                      shrink: plan.quantity ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: plan.quantity,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                <DateTimePickerComponent
                    value={plan.date}
                    classes={classes}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Zmiana"
                    id="shift"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    required
                    labelProps={{
                      shrink: plan.shift ? true : false,
                    }}
                    inputProps={{
                      onChange: handleChange,
                      value: plan.shift,
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
