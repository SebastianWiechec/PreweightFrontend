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

export default function UserList(props) {
    const columns = [
    { field: "name1", headerName: "Nazwa Użytkownika", width: 300 },
    { field: "mail1", headerName: "E-Mail", width: 300 },
    { field: "rolename1", headerName: "Rola", width: 130 },
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
  const [href, setHref] = useState(`#admin/userlist/${localStorage.userId}`);

  async function setNewUsers(users,) {
    let newUsers = users.map((user) => {
      if (user.phoneNumber){
        if(user.phoneNumber==2){
          user.rolename = "Admin"
        }
        else{
          user.rolename = "User"
        }
      }else{
        user.rolename = "brak";
      }
     
      return user;
    });
    return newUsers;
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await api.request(API_TYPES.USER).fetchAll();


      let o =await setNewUsers(users.data)

      const updatedJson = o.map(
        ({
          id: id,
          userName: name1,
          email: mail1,
          phoneNumber: role1,
          rolename: rolename1,
         
        }) => ({
          id,
          name1,
          mail1,
          role1,
          rolename1,
         
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
              <h4 className={classes.cardTitleWhite}>Lista użytkowników</h4>
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
                let address = `#admin/user/${newSelection.selectionModel}`;
                setHref(address);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <Typography paragraph></Typography>
          <Button variant="contained" color="info" href={href}>
            Edytuj użytkownika
          </Button>
        </Container>
        </Card>
      </GridContainer>
    </div>
  );
}
