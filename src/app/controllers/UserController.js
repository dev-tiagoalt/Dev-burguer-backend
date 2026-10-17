import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import * as Yup from 'yup'
import User from '../models/User.js'

class UserController {
  // Métodos para manipular usuários
  async store(_req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6).required(),
      admin: Yup.boolean(),
    })
    try {
      await schema.validate(_req.body, { abortEarly: false, strict: true })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Validation fails', messages: err.errors })
    }
    const { name, email, password, admin } = _req.body

    const existingUser = await User.findOne({
      where: { email },
    })
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail already taken' })
    }
    const password_Hash = await bcrypt.hash(password, 8)

    try {
      const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash: password_Hash,
        admin,
      })

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      })
    } catch (err) {
      console.log('ERRO COMPLETO:')
      console.log(err)

      console.log('ERRO DO POSTGRES:')
      console.log(err.parent)

      return res.status(500).json({
        error: err.message,
      })
    }
  }
}

export default new UserController()

/*
store -> Criar um novo usuário
index -> Listar usuários
show -> Mostrar um usuário específico
update -> Atualizar um usuário
delete -> Deletar um usuário
*/
