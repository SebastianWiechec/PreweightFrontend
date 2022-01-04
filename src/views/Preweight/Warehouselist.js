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
import emailjs from "@emailjs/browser";
import Grid from "@material-ui/core/Grid";

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

export default function Warehouselist(props) {
    const columns = [
    { field: "id1", headerName: "Nazwa", width: 300 },
    { field: "quant1", headerName: "Ilość", width: 200 },
    { field: "un1", headerName: "Jednostka", width: 200 },
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
  const [href, setHref] = useState("/admin/Warehouse/0");
  
  async function setNewWarehouses(warehouses, materials, ) {
    
    
    let newWarehouses = warehouses.map((warehouse) => {

      let warehouseDesc = materials.find((material) => material.idMaterial === warehouse.idMaterial);
      warehouse.unit = materials.find((material) => material.idMaterial === warehouse.idMaterial).unit;
      warehouse.idMaterial = warehouseDesc.name;
       
      return warehouse;

    });
    return newWarehouses;
  }

  useEffect(() => {
    const fetchData = async () => {
      const warehouses = await api.request(API_TYPES.WAREHOUSE).fetchAll();
      const materials = await api.request(API_TYPES.MATERIAL).fetchAll();
      
      let o =await setNewWarehouses(warehouses.data, materials.data, )
      const updatedJson = o.map(
        ({
          idWarehouse: id,
          idMaterial: id1,
          quantity: quant1,
          unit:un1,
                   
        }) => ({
          id,
          id1,
          quant1,
          un1,
         })
      );
      setData(updatedJson);
    };

    fetchData();
  }, []);

  const handleSubmit = (e, lista) => {
    e.preventDefault(); // Prevents default refresh by the browser
    let data = `<table style="border-collapse: collapse;
    border-spacing: 0;
    width: 50%;
    border: 1px solid #ddd;">
    <tr>
      <th>Nazwa</th>
      <th>Ilość</th>
      <th>Jednostka</th>
    </tr>`;
    for (const list of lista) {
      data =
        data +
        `  <tr>
      <td>${list.id1}</td>
      <td>${list.quant1}</td>
      <td>${list.un1}</td>
    </tr>
  `;
    }
    data = data + `</table>`;

 
    var templateParams = {
      message: data,
   
    };
    emailjs
      .send(
        `service_5ifanjk`,
        "template_ymo1c7e",
        templateParams,
        "user_c32W4jJHKL00DiiNPhaFw"
      )
      .then(
        (result) => {
          alert("Wiadomość wysłana", result.text);
        },
        (error) => {
          alert("Błąd - spróbuj ponownie", error.text);
        }
      );
  };


  return (
    <div>
      <GridContainer>
      <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Lista materiałów na naważalni</h4>
            </CardHeader>
        <Container maxWidth="lg">
          <div style={{ height: 450, marginTop: 0 }}>
            <DataGrid
              rows={planList1}
              columns={columns}
              pageSize={6}
              id="idWarehouse"
              //hideFooterPagination
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
                let address = `/admin/Warehouse/${newSelection.selectionModel}`;
                setHref(address);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <Typography paragraph></Typography>
          <Grid container spacing={12}>
              <Grid item xs={10}>
              <Button variant="contained" color="info" href={href}>
                Przyjmij/zdaj Materiał
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                variant="contained"
                color="info"
                onClick={(e) =>
                  handleSubmit(e, planList1)
                }
              >
                Wyślij Raport
              </Button>
              </Grid>
              </Grid>
          </Container>
         </Card>
      </GridContainer>
    </div>
  );
}
