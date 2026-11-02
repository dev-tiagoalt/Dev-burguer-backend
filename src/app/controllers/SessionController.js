import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import User from '../models/User.js'

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    })

    const isValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    })

    const emailOrPasswordIncorrect = () => {
      return response.status(400).json({
        error: 'E-mail ou senha incorretos!',
      })
    }

    if (!isValid) {
      return emailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    const existingUser = await User.findOne({
      where: { email },
    })

    if (!existingUser) {
      return emailOrPasswordIncorrect()
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password_hash,
    )

    if (!isPasswordCorrect) {
      return emailOrPasswordIncorrect()
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    return response.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
      token,
    })
  }
}

export default new SessionController()
