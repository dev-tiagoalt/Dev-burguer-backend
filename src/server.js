import 'dotenv/config'
import app from './app.js'
import './database/index.js'

app.listen(3001, () => console.log('Servidor rodando na porta 3001'))
