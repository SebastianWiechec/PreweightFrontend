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

export default function RecipeList(props) {
    const columns = [
    { field: "bCode1", headerName: "B-Kod Receptury", width: 300 },
    { field: "name1", headerName: "Nazwa materiału", width: 300 },
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
  const [userList1, setData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [href, setHref] = useState("/admin/RecipeProfile/0");

  async function setNewMaterials(recipes,) {
    let newRecipes = recipes.map((recipe) => {
      
     
      return recipe;
    });
    return newRecipes;
  }

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await api.request(API_TYPES.RECIPE).fetchAll();


     let o =await setNewMaterials(recipes.data)

      const updatedJson = o.map(
        ({
          idRecipe: id,
          bCode: bCode1,
          name: name1,
          
         
         
        }) => ({
          id,
          bCode1,
          name1,      
        })
      );

      setData(updatedJson);
    };

    fetchData();
  }, []);
 
  return (
    <div>
      <GridContainer>
        <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Lista receptur</h4>
            </CardHeader>
        
        <Container maxWidth="lg">
          <div style={{ height: 450, marginTop: 0 }}>
            <DataGrid
              rows={userList1}
              columns={columns}
              pageSize={6}
              id="id"
              //hideFooterPagination
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
                let address = `/admin/RecipeProfile/${newSelection.selectionModel}`;
                setHref(address);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <Typography paragraph></Typography>
          <Button variant="contained" color="info" href={href}>
            Edytuj/dodaj recepturę
          </Button>
        </Container>
        </Card>
      </GridContainer>
    </div>
  );
}
