import React from "react";
import { Button } from '@mui/material';

  const QuestAns = (props) => {
    return (
      <div>
        <h2>Questions & Answers</h2>
          {props.personal === 0 && props.professional === 0
            ? <><Button onClick={props.onClickPersonal} type="click">Personal</Button>
              <Button onClick={props.onClickProf} type="click">Professional</Button>
              <br/>Select a topic to discuss</>
              
            : <><Button onClick={props.onClickPersonal} type="click">Personal</Button>
              <Button onClick={props.onClickProf} type="click">Professional</Button>
              <br/>{props.questions}</>
          }
      </div>
    )
  }

  export default QuestAns;