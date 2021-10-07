import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment'
import './App.css'
import { Stack, ListItemButton, ListItemText, Container, Card } from '@mui/material';
import Comment from './components/comment';
import Info from './components/info';
import QuestAns from './components/questAns';
import questSheetPersonal from './sheets/questionsPersonal'
import questSheetProf from './sheets/questionsProf'

const RepoDetails = (props) => {
  return (
    <div>{props.repoDetails}</div>
  )
}

const App = (props) => {
  const [comments, setComments] = useState([])
  const [info, setInfo] = useState([])
  const [subInfo, setSubInfo] = useState([])
  const [repoInfo, setRepoInfo] = useState([])
  const [newComment, setNewComment] = useState([])
  const [questions, setQuestions] = useState([])
  const [personal, setPersonal] = useState(0)
  const [professional, setProfessional] = useState(0)
  const [toShow, setToShow] = useState()
  const [showTab, setShowTab] = useState()
  const [showRepo, setShowRepo] = useState()

  const updated_date = moment(info.updated_at, "YYYY-MM-DD").fromNow()
  const created_date = moment(info.created_at, "YYYY-MM-DD").fromNow()

  const hook = () => {
   axios
    .get('http://api.github.com/users/riikkawho')
    .then(response => {
     setInfo(response.data)
    })

    axios
     .get('http://api.github.com/users/riikkawho/repos')
     .then(response => {
      setSubInfo(response.data)
     })

     axios.get('http://localhost:3001/comments')
     .then(response => {
       setComments(response.data)
     })
  }
  useEffect(hook, [])

  const addComment = (event) => { 
    event.preventDefault()

    const commentObject = {
      content: newComment
    }
    
    axios.post('http://localhost:3001/comments', commentObject) 
      .then(setComments(comments.concat(commentObject)))
  setNewComment('')
}

const onClickPersonal = (event) => {
  event.preventDefault()
  setPersonal(1)
  setProfessional(0)
  setToShow()
  setQuestions(questSheetPersonal)
}

const onClickProf = (event) => {
  event.preventDefault()
  setProfessional(1)
  setPersonal(0)
  setToShow()
  setQuestions(questSheetProf)
}

const onClickAnswer = (index) => { 
  toShow === index 
   ? setToShow()
   : setToShow(index)
}

const onClickRepo = (index) => {
  showRepo === index
  ? setShowRepo()
  : setShowRepo(index)

  axios
  .get(`http://api.github.com/repos/riikkawho/${subInfo[index].name}/contents`)
  .then(response => {
     setRepoInfo(response.data)
  }) 
}

const handleChange = (event) => {
  setNewComment(event.target.value)
}

return (
<div>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20, height: "100%"}}>
    <div > 
    <Container color="primary" sx={{ height: '100%', width: '30' }} style={{backgroundColor: "whitesmoke", borderRadius: "10px"}}>
    <Info 
      fullname={info.name}
      bio={info.bio}
      url={info.html_url}
      image={info.avatar_url}
      name={info.login}
      language={repoInfo.language}
      created={created_date}
      updated={updated_date}
      /> 

      <h4>Repositories</h4>
      <RepoDetails
        repoDetails=
        {subInfo.map((repo, index) => 
          showRepo === index
            ? <ListItemButton onClick={() => onClickRepo(index)}>
              <ListItemText  primary={repo.name} secondary={`Contains ${repoInfo.length} items, last commit was ${moment(repo.updated_at, "YYYY-MM-DD").fromNow()}, written in ${repo.language}`}/>
              </ListItemButton>
      
            : <ListItemButton onClick={() => onClickRepo(index)}>
              <ListItemText primary={repo.name} />
              </ListItemButton>)}
      /> 
    </Container>
  </div>

  <div>
    <Container sx={{ height: '100%' }} style={{ backgroundColor: "lightgrey", borderRadius: "10px" }}>
      <QuestAns 
        key={questions.question}
        onClickPersonal={onClickPersonal}
        onClickProf={onClickProf}
        personal={personal}
        professional={professional}
        questions=
        {questions.map((question, index) => 
          toShow === index
            ? <Card style={{backgroundColor: "whitesmoke"}}>
              <ListItemButton onClick={() => onClickAnswer(index)}>
              <ListItemText  primary={question.question} secondary={question.answer}/>
              </ListItemButton>
              </Card>

            : <ListItemButton onClick={() => onClickAnswer(index)}>
              <ListItemText primary={question.question} />
              </ListItemButton>)}
      />
    </Container>
  </div>
  
  <div>
    <Container sx={{ height: '100%' }} style={{ backgroundColor: "whitesmoke", borderRadius: "10px" }}>
      <Comment 
        onClick={addComment}
        comments={[...comments].reverse().map(comment => <Stack textAlign="center" fontSize="14px"><p>{comment.content}</p></Stack>)}
        onChange={handleChange}
        newComment={newComment}
      />
    </Container>
    </div>
  </div> 
</div>
  )
}

export default App;

