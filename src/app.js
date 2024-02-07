const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
   res.send({ msg: 'API Rest Kodemia gen 30' }) 
})

app.listen(port, () => {
    console.log('Server is ready')
})
