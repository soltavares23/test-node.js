import { Schema, model, type Model } from 'mongoose'
import type IProduct from '../interfaces/product'
class Product {
  public readonly model: Model<IProduct>

  constructor () {
    const productSchema = new Schema<IProduct>({
      name: String,
      price: Number,
      promotionalPrice: Number,
      description: String,
      image: String,
      quantity: Number
    })
    this.model = model<IProduct>('Product', productSchema)
  }

  async create (product: IProduct): Promise<IProduct> {
    const createdProduct = await this.model.create(product)
    return createdProduct
  }

  async update (id: string, product: IProduct): Promise<IProduct> {
    const updatedProduct = await this.model.findByIdAndUpdate(id, product, {
      new: true
    })
    return updatedProduct as IProduct
  }
}

export default new Product()
