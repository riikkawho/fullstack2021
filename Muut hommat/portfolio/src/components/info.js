import React from "react";
import { ListItemAvatar, Avatar, ListItem, Card, ListItemText } from '@mui/material';


const Info = (props) => {

    return (
    <div>
      <div>
        <h2>{props.fullname}</h2>
        <Card style={{ backgroundColor: "lightgrey" }}>
          <p>{props.bio}</p>
        </Card>
        <h4>My profiles:&nbsp;
          <a href={props.url}>Github</a>&nbsp;&nbsp;
          <a href="https://www.linkedin.com/in/riikka-kukka">LinkedIn</a></h4>
      </div>
      <p/>
      <div>
        <h3>Github review</h3> 
          <Card>
          <ListItem alignItems="center">
            <ListItemText alignItems="center">@{props.name}</ListItemText>
            <ListItemAvatar><Avatar src={props.image} alt="avatar"/></ListItemAvatar>
          </ListItem>
            <ListItemText>
              created {props.created}, last update {props.updated}
            </ListItemText>
          {props.information}
          </Card>
      </div>
    </div>
    )
  }

  export default Info;