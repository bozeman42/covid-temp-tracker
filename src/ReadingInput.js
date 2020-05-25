import React, { useState } from 'react'
import moment from 'moment-timezone'

const ReadingInput = ({ setNewPost }) => {
  const [ temperature, setTemperature ] = useState(98.6)
  const [ dateTime, setDateTime ] = useState(moment().format('YYYY-MM-DDTHH:mm'))
  const [ needDate, setNeedDate] = useState(false)

  const validTemperature = () => {
    return 90 < temperature && 115 > temperature
  }

  const validDate = () => {
    const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/
    return dateRegex.test(dateTime)
  }

  const validData = () => {
    return validTemperature() && validDate()
  }

  const submitTemperature = async e =>{
    e.preventDefault()
    if (validData()) {
      await fetch('/api/temperatures/user/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          temp: Math.round(temperature * 10),
          dateTime: (needDate && dateTime) ? dateTime : null
        })
      })
      setNewPost(true)
    }
  }

  return (
    <form className="input-container" onSubmit={e => submitTemperature(e)}>
        <input required type="number" step="0.1" value={temperature} onChange={e => setTemperature(Math.round(10 * e.target.value) / 10)}placeholder="Temperature"/>
        <p>Report previous reading?
        <input type="checkbox" onChange={() => setNeedDate(!needDate)} checked={needDate} /></p>
        {
          needDate
          ? <input required type='datetime-local' value={dateTime} onChange={e => setDateTime(e.target.value)} />
          // ? <React.Fragment>
          //     <input value={date} onChange={e => setDate(e.target.value)} type='date' /> 
          //     <input value={time} onChange={e => setTime(e.target.value)} type='time' /> 
          //   </React.Fragment>
          : false
        }
        <button type="submit">Submit</button>
      </form>
  )
}

export default ReadingInput
