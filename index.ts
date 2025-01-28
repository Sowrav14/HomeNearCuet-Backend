import express from 'express'
import { db } from './app/configs/db.config'

const userRouter = require('./app/routers/users')
const app = express()
const PORT = process.env.PORT || 8080

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use("/api/v1/users", userRouter)

//db connection then server connection
db.then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
})