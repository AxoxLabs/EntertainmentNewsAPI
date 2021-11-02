const express = require('express')
const cors = require('cors')
const songsEndpoint = require('./api/songs')

const app = express()

app.use(cors())


app.get('/', (req,res) => {
    res.json('Song Web Scrapping API')
})

app.use('/api/songs', songsEndpoint)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`API Server is running on PORT ${PORT}`))