import React, {useState, useEffect} from 'react';
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
      // if (user) {
        const result = await fetch('/api/temperatures/user/1')
        const dataResult = await result.json()
        setData(dataResult)
      // }
    }
    fetchData()
    setNewPost(false)
  }, [ newPost ])
  // useEffect(async () => {
  //   if (!users) {
      
  //   }
  // })


  return (
    <div className="App">
      <Chart data={data} />
      <ReadingInput setNewPost={setNewPost} />
    </div>
  );
}

export default App;
