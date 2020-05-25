const router = require('express').Router()
const moment = require('moment-timezone')

const pool = require('../modules/pool.js')

router.get('/user/:id', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(`select id, time, temperature from temperatures where user_id = $1 order by time;`,[req.params.id])
    console.log(result.rows[result.rows.length - 1])
    const data = result.rows.map(item => {
      const timeStr = item.time.toISOString()
      const localTimeString = moment.tz(timeStr.substring(0, timeStr.length - 5), 'America/Chicago').toISOString()
      return [
        Date.parse(localTimeString),
        item.temperature / 10,
        item.id
      ]
    })
    res.send(data)
    client.release()
  } catch(e) {
    res.sendStatus(500)
  }
})

router.post('/user/:id', async (req, res) => {
  const data = req.body
  const { temp, dateTime } = data
  const { id } = req.params
  try {
    const client = await pool.connect()
    let result
    if (dateTime) {
      const timeStamp = dateTime.split('T').join(' ')
      result = await client.query(`insert into temperatures (user_id, temperature, time) values ($1, $2, TO_TIMESTAMP($3, 'YYYY-MM-DD HH24:MI'));`,
      [
        id,
        temp,
        timeStamp
      ])
    } else {
      result = await client.query(`INSERT INTO temperatures (user_id, temperature) values ($1, $2);`, [ id, temp ])
    }
    res.send(result.rows)
    client.release()
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.delete('/', async (req, res) => {
  try {
    const id = parseInt(req.query.id)
    res.send(`You sent id #${id}`).status('200')
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router