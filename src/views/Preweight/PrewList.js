/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import api, { API_TYPES } from "../../actions/api";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import GridItem from "components/Grid/GridItem.js";
import InputLabel from "@material-ui/core/InputLabel";
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

export default function PrewList(props) {
    const columns = [
      { field: "id1", headerName: "Nazwa Receptury", width: 300 },
      { field: "id2", headerName: "Materiał", width: 300 },
      { field: "quant1", headerName: "Ilość", width: 150 },
     ];

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  }));

  const classes = useStyles();
  const [planList1, setData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [href, setHref] = useState("#admin/PrewProfile/0");
  
  async function setNewWarehouses(prews, mats, recipes,  ) {
    
    
    let newPreweights = prews.map((prew) => {

      let descMaterial = mats.find((material) => material.idMaterial === prew.idMaterial);
     let descRecipe = recipes.find((recipe) => recipe.idRecipe === prew.idRecipe);
      prew.idMaterial=descMaterial.name;
     prew.idRecipe=descRecipe.name
      
      return prew;

    });
    
    return newPreweights;
  }

  useEffect(() => {
    const fetchData = async () => {
      const prews = await api.request(API_TYPES.PREWEIGHT).fetchAll();
      const mats = await api.request(API_TYPES.MATERIAL).fetchAll();
      const recipes = await api.request(API_TYPES.RECIPE).fetchAll();
      
      let o =await setNewWarehouses(prews.data, mats.data, recipes.data, )
      const updatedJson = o.map(
        ({
          idPreweight: id,
          idRecipe: id1,
          idMaterial: id2,
          quantity: quant1,
          
                   
        }) => ({
          id,
          id1,
          id2,
          quant1,
          
         })
      );
      
      setData(updatedJson);
    };

    fetchData();
  }, []);

  const [state, setState] = React.useState({
    id1: 0,
    });
  
  const [filterPlans, setFilterPlans] = useState([]);
  
  const handleChange = (event) => {
  
  const name = event.target.id;
  setState({
    [name]: event.target.value,
  });

  if (name == "id1") {
    if (event.target.value != 0) {
      let filtredPlans = planList1.filter(
        (x) => x.id1 == event.target.value
      );
      
      setFilterPlans(filtredPlans);
    } else {
      setFilterPlans(planList1);
    }
      
  }
};

  function newKeys (planList1) {
    let i=0;
    let  keyList = [];
    planList1.forEach(element => {
        keyList[i]=element.id1;
        i=i+1;
      })

    let uniqueKeys = keyList.unique()
    return uniqueKeys
  }

  Array.prototype.unique = function () {
  var unique = [];
  for (let i=0; i<this.length; i++){
    var current = this[i];
    if (unique.indexOf(current)<0) unique.push(current);
  }
  return unique
  }

  newKeys (planList1);

  let filterKeys= newKeys (planList1);

  return (
    <div>
      <GridContainer>
          <GridItem xs={8} sm={8} md={5}>
          <InputLabel htmlFor="shift1">Wybierz Recepturę</InputLabel>
          <Select
            native
            value={state.id1}
            onChange={handleChange}
            id="id1"
            required
            fullWidth="true"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{}}
          >
            <option aria-label="None" value="" />
            {filterPlans.length
              ? filterKeys.map((prew, key) => (
                  <option key={key} value={prew}>
                    {prew}
                  </option>
                ))
              : filterKeys.map((prew, key) => (
                  <option key={key} value={prew}>
                    {prew}
                  </option>
                ))}
          </Select>
        </GridItem>
        <div style={{ height: 70, marginTop: 10 }}>
        <Typography paragraph></Typography>
        </div>
      <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Skład naważek</h4>
            </CardHeader>
        <Container maxWidth="lg">
          <div style={{ height: 350, marginTop: 0 }}>
            <DataGrid
              rows={filterPlans.length == 0 ? planList1 : filterPlans}
              columns={columns}
              pageSize={5}
              id="id"
              //hideFooterPagination
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
                let address = `#admin/PrewProfile/${newSelection.selectionModel}`;
                setHref(address);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <Typography paragraph></Typography>
          <Button variant="contained" color="info" href={href}>
            Edytuj / Dodaj pozycję
          </Button>
        </Container>
        </Card>
      </GridContainer>
    </div>
  );
}
