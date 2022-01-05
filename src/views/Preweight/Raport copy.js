/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import api, { API_TYPES } from "../../actions/api";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import GridItem from "components/Grid/GridItem.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import emailjs from "@emailjs/browser";
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

export default function RaportWykonanych(props) {
  emailjs.init("user_c32W4jJHKL00DiiNPhaFw");
  const columns = [
    { field: "id1", headerName: "Receptura", width: 200 },
    { field: "quant1", headerName: "Ilość", width: 130 },
    { field: "date1", headerName: "Data", width: 130 },
    { field: "shift1", headerName: "Zmiana", width: 150 },
  ];

  const [state, setState] = React.useState({
    date1: 0,
    shift1: 0,
  });
  const [filterPlans, setFilterPlans] = useState([]);
  const [plans2, setUpdatedPlans] = useState([]);

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

  const handleChange = (event) => {
    const name = event.target.id;

    setState({
      [name]: event.target.value,
    });

    if (name == "date1") {
      if (event.target.value != 0) {
        let filtredPlans = planList1.filter(
          (x) => x.date1 == event.target.value
        );
        setFilterPlans(filtredPlans);
      } else {
        setFilterPlans(planList1);
      }
    }
    if (name == "shift1") {
      if (event.target.value != 0) {
        let filtredPlans = planList1.filter(
          (x) => x.shift1 == event.target.value
        );
        setFilterPlans(filtredPlans);
      } else {
        setFilterPlans(planList1);
      }
    }
  };

  const classes = useStyles();
  const [planList1, setData] = useState([]);

  const [href, setHref] = useState("/admin/Plan/0");

  async function setNewPlans(plans, recipes, dones) {
    let newPlans = plans.map((plan) => {
      plan.date = plan.date.substring(0, plan.date.indexOf("T"));
      let planDesc = recipes.find(
        (recipe) => recipe.idRecipe === plan.idRecipe
      );

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
        }) => ({
          id,
          id1,
          quant1,
          date1,
          shift1,
          done2,
        })
      );
      setData(updatedJson.filter((x) => x.done2 != 0));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      setFilterPlans(filterPlans ? filterPlans : planList1);
    };

    updateData();
  }, [filterPlans]);

  const handleSubmit = (e, lista) => {
    e.preventDefault(); // Prevents default refresh by the browser
    let data = `<table style="border-collapse: collapse;
    border-spacing: 0;
    width: 50%;
    border: 1px solid #ddd;">
    <tr>
      <th>Receptura</th>
      <th>Ilość</th>
      <th>Data</th>
      <th>Zmiana</th>
    </tr>`;
    for (const list of lista) {
      data =
        data +
        `  <tr>
      <td>${list.id1}</td>
      <td>${list.quant1}</td>
      <td>${list.date1}</td>
      <td>${list.shift1}</td>
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
        "template_843a67n",
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

  function newKeysDate (planList1) {
    let i=0;
    let  keyList = [];
    planList1.forEach(element => {
        keyList[i]=element.date1;
        i=i+1;
      })

    let uniqueKeys = keyList.unique()
    return uniqueKeys
  }

  function newKeysShift (planList1) {
    let i=0;
    let  keyList = [];
    planList1.forEach(element => {
        keyList[i]=element.shift1;
        i=i+1;
      })

    let uniqueKeys = keyList.unique()
    return uniqueKeys
  }

  function newKeysDatefilt (filterPlans) {
    let i=0;
    let  keyList = [];
    filterPlans.forEach(element => {
        keyList[i]=element.date1;
        i=i+1;
      })

    let uniqueKeys = keyList.unique()
    return uniqueKeys
  }

  function newKeysShiftfilt (filterPlans) {
    let i=0;
    let  keyList = [];
    filterPlans.forEach(element => {
        keyList[i]=element.shift1;
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

  let dateKeys =  newKeysDate (planList1);
  let shiftKeys = newKeysShift(planList1);
  let dateKeysFiltered =  newKeysDatefilt (filterPlans);
  let shiftKeysFiltered = newKeysShiftfilt(filterPlans);

  return (
    <div>
      <GridContainer>
      <GridItem xs={8} sm={8} md={5}>
          <InputLabel htmlFor="date1">Wybierz datę</InputLabel>
          <Select
            native
            value={state.date1}
            onChange={handleChange}
            id="date1"
            required
            fullWidth="true"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{}}
          >
            <option aria-label="None" value="" />
            {filterPlans.length
              ? dateKeysFiltered.map((plan, key) => (
                  <option key={key} value={plan}>
                    {plan}
                  </option>
                ))
              : dateKeys.map((plan, key) => (
                  <option key={key} value={plan}>
                    {plan}
                  </option>
                ))}
          </Select>
          </GridItem>
          <GridItem xs={8} sm={8} md={5}>
          <InputLabel htmlFor="shift1">Wybierz zmianę</InputLabel>
          <Select
            native
            value={state.shift1}
            onChange={handleChange}
            id="shift1"
            required
            fullWidth="true"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{}}
          >
            <option aria-label="None" value="" />
            {filterPlans.length
              ? shiftKeysFiltered.map((plan, key) => (
                  <option key={key} value={plan}>
                    {plan}
                  </option>
                ))
              : shiftKeys.map((plan, key) => (
                  <option key={key} value={plan}>
                    {plan}
                  </option>
                ))}
          </Select>
        </GridItem>
        <div style={{ height: 70, marginTop: 10 }}>
        <Typography paragraph></Typography>
        </div>
        </GridContainer>
        <GridContainer>
      <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Raport wykonanych naważek</h4>
            </CardHeader>
       
        <Container maxWidth="lg">
          <div style={{ height: 350, marginTop: 10 }}>
            <DataGrid
              rows={filterPlans.length == 0 ? planList1 : filterPlans}
              columns={columns}
              pageSize={4}
              id="idPlan"
            />
          </div>
          <Typography paragraph></Typography>
          <Button
            variant="contained"
            color="info"
            onClick={(e) =>
              handleSubmit(e, filterPlans.length == 0 ? planList1 : filterPlans)
            }
          >
            Wyślij Raport
          </Button>
        </Container>
        </Card>
      </GridContainer>
    </div>
  );
}
