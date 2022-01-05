/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import api, { API_TYPES } from "../../actions/api";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "../../components/Modal/Modal";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

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

export default function PlanList(props) {
  const columns = [
    { field: "id1", headerName: "Receptura", width: 200 },
    { field: "quant1", headerName: "Ilość", width: 130 },
    { field: "date1", headerName: "Data", width: 130 },
    { field: "shift1", headerName: "Zmiana", width: 150 },
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
  const [selectionModel, setSelectionModel] = useState();
  const [href, setHref] = useState("#admin/Plan/0");
  const [refresh, setRefresh] = useState(false);

  async function setNewPlans(plans, recipes, dones) {
    let newPlans = plans.map((plan) => {
      plan.date = plan.date.substring(0, plan.date.indexOf("T"));
      let planDesc = recipes.find(
        (recipe) => recipe.idRecipe === plan.idRecipe
      );
      plan.idforDone = plan.idRecipe;
      plan.idRecipe = planDesc.name;

      if (dones.find((done) => plan.idPlan === done.quantity)) {
        plan.done1 = dones.find((done) => plan.idPlan === done.quantity).idDone;
      } else {
        plan.done1 = 0;
      }
      return plan;
    });

    return newPlans;
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.request(API_TYPES.PLAN).fetchAll();
      const recipes = await api.request(API_TYPES.RECIPE).fetchAll();
      const dones = await api.request(API_TYPES.DONE).fetchAll();

      let o = await setNewPlans(request.data, recipes.data, dones.data);

      const updatedJson = o.map(
        ({
          idPlan: id,
          idRecipe: id1,
          quantity: quant1,
          date: date1,
          shift: shift1,
          done1: done2,
          idforDone: idforDone,
        }) => ({
          id,
          id1,
          quant1,
          date1,
          shift1,
          done2,
          idforDone,
        })
      );
      setData(updatedJson.filter((x) => x.done2 === 0));
    };

    fetchData();
  }, [refresh]);

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const addDone = async (planList1) => {
    let idP = planList1.find((x) => x.id == selectionModel[0]).idforDone;
    let newDone = {
      idDone: 0,
      idRecipe: idP,
      quantity: selectionModel[0],
    };
    UpdateWarehouse(idP)
      await api
      .request(API_TYPES.DONE)
      .create("", newDone)
      .then(() => {
        setRefresh(!refresh);
        setSelectionModel(null);
        setOpen(true);
      });
  };

  const UpdateWarehouse = async (idP) =>{
    const materials = await api.request(API_TYPES.MATERIAL).fetchAll();
    const warehouses = await api.request(API_TYPES.WAREHOUSE).fetchAll();
    const plans2 = await api.request(API_TYPES.PLAN).fetchAll();
 
    const preweights = await api.request(API_TYPES.PREWEIGHT).fetchAll();
    const prew = preweights.data;
    const ware = warehouses.data;

    let quantPlan = plans2.data[idP+1].quantity;
    let recipeid = plans2.data[idP+1].idRecipe;
    
    let newMaterials = [];
    let quantFromPrew = [];
    let materialsToUpd = [];
    let materFromWh = [];
    let matReadytoUpd = [];
    let i=0;
    prew.forEach(element => {if (element.idRecipe === recipeid){
      newMaterials[i]=element.idMaterial;

          ware.forEach(element1 => {if (element1.idMaterial === newMaterials[i]){
            materialsToUpd[i]=element1.idWarehouse;
            materFromWh[i]=element1.quantity;
          }
         });

      quantFromPrew[i]=parseFloat(element.quantity)*parseFloat(quantPlan);
      matReadytoUpd[i]=parseFloat(materFromWh[i])-parseFloat(quantFromPrew[i]);
      i=i+1;}
    })

    for (let n=1; n<=i; n=n+1){
     await updWarehouseQuant(materialsToUpd[n-1], newMaterials[n-1], matReadytoUpd[n-1]);
    }

  };  


   const updWarehouseQuant = async (warid, matid, quant) => {
      let newWareh = {
        idWarehouse: parseInt(warid),
        idMaterial: parseInt(matid),
        quantity: parseFloat(quant),}

        await api.request(API_TYPES.WAREHOUSE).update(warid, newWareh)
    };

   
      
  



  return (
    <div>
      <Modal
        open={open}
        onChange={handleClose}
        txt={"OK"}
        title={"Zapisano dane"}
      />
      <GridContainer>
      <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Lista naważek do wykonania</h4>
            </CardHeader>   
 
        <Container maxWidth="lg">
          <div style={{ height: 450, marginTop: 0 }}>
            <DataGrid
              rows={planList1}
              columns={columns}
              pageSize={6} //pageSize={planList1.length}
              id="idPlan"
              //hideFooterPagination
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
                let address = `#admin/Plan/${newSelection.selectionModel}`;
                setHref(address);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <Typography paragraph></Typography>
          <Container>
            <Grid container spacing={12}>
              <Grid item xs={10}>
                <Button variant="contained" color="info" href={href}>
                  Edytuj/dodaj Plan
                </Button>
              </Grid>
              <Grid item xs={2}>
                {selectionModel && (
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => addDone(planList1)}
                  >Raportuj wykonanie
                  </Button>
                )}
              </Grid>
            </Grid>
          </Container>
        </Container>
        </Card>
      </GridContainer>
    </div>
  );
}
