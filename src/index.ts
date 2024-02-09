import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import router from './routers';
import { commonMiddleware } from './middlewares/common';
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/v1/', commonMiddleware, router)

app.listen(PORT, () => console.log('Server on start for port: ' + PORT))

export default app