const app = require('../app')
const { db } = require('../config/mongodb')

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log('Running on', PORT)
  db.once('open', () => {
    console.log('MongoDB Connected')
  })
})
