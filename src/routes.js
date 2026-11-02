import { Router } from 'express'
import multer from 'multer'
import ProductController from './app/controllers/ProductController.js'
import SessionController from './app/controllers/SessionController.js'
import UserController from './app/controllers/UserController.js'
import multerConfig from './config/multer.cjs'
import authMiddlewere from './middlewares/auth.js'

// Cria as rotas
const routes = new Router()
const upload = multer(multerConfig)

// Métodos HTTP: GET, POST, PUT, DELETE
routes.post('/users', UserController.store)
routes.post('/session', SessionController.store);
routes.use(authMiddlewere);
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

// Exporta as rotas
export default routes
