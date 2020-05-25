import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import './App.css';
import Chart from './Chart'
import ReadingInput from './ReadingInput'

function App() {
  // const [ user, setUser ] = useState(1)
  const [data, setData] = useState([])
  const [ newPost, setNewPost ] = useState(false)
  // const [ users, setUsers ] = useState([])
  // const [ triggerLoad, setTriggerLoad ] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/temperatures/user/1')
      const dataResult = await result.json()
      setData(dataResult)
    }
    fetchData()
    setNewPost(false)
  }, [ newPost ])
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/chart">
            <Chart data={data} />
            <ReadingInput setNewPost={setNewPost} />
          </Route>
          <Route path="/">Hello!</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
