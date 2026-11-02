import jwt from 'jsonwebtoken'

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const token = authToken.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    request.userId = decoded.id
    return next()
  } catch (_error) {
    return response.status(401).json({ error: 'Token is invalid' })
  }
}

export default authMiddleware
