import React from "react";
import { Button, TextField, Card } from '@mui/material';

  
  const Comment = (props) => {
      return (
      <div>
        <h2> Comments </h2> 
        <p>Please leave a comment to let me know you were here:</p> 
        <TextField
        onSubmit={props.addComment}
        value={props.newComment}
        onChange={props.onChange}/>
        <br/><Button onClick={props.onClick} type="submit">Submit</Button>
       <Card style={{ backgroundColor: "lightgrey"}}><br/> {props.comments} </Card>
      </div>
      )
  }

  export default Comment;