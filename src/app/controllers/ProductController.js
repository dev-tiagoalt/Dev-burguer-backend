import * as Yup from 'yup'
import Product from '../models/Products.js'

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    if (!request.file) {
      return response.status(400).json({ error: 'Imagem é obrigatória' })
    }

    const { filename: path } = request.file
    const { name, price, category } = request.body

    const product = await Product.create({
      name,
      price,
      category,
      path,
    })

    return response.status(201).json(product)
  }

  async index(_request, response) {
    const products = await Product.findAll()

    const result = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      path: product.path,
      url: `http://localhost:3001/product-file/${product.path}`,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }))

    return response.json(result)
  }
}

export default new ProductController()
