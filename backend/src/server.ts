import cors from 'cors'
import { configDotenv } from 'dotenv'
import express, { type Application } from 'express'
import mongoose from 'mongoose'
import router from './routes/index.routes'

// trabalhar com data e hora em JS com agilidade
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

// carrega os dados do .env para seu projeto
configDotenv()

// Exemplo de uso do .env
const password = process.env.MONGO_PASSWORD
const user = process.env.MONGO_USER
const cluster = process.env.MONGO_CLUSTER
const collection = process.env.MONGO_COLLECTION

const mongodbURL = encodeURI(`mongodb+srv://${user}:${password}@${cluster}/${collection}?retryWrites=true&w=majority`)
const app: Application = express()

async function startServer (): Promise<void> {
  try {
    await mongoose.connect(mongodbURL)
    app.use(express.json())
    app.use(cors())
    app.use(router)

    const port = process.env.PORT

    app.get('/', (_req, res) => {
      res.send("It's alive!")
    })

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`)
    })
  } catch (error) {
    console.log('Erro no servidor:', error)
  }
}

startServer().catch((error) => {
  console.log('Erro no servidor:', error)
})
