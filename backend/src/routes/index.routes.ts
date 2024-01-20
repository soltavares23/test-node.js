/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import multer from 'multer'
import product_model from '../models/product_model'
import { handleUpload } from '../utils/cloudinary'

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    if (req.file == null || req.file === undefined) {
      throw new Error('Arquivo não encontrado')
    }
    const newProduct = req.body
    const b64 = Buffer.from(req.file.buffer).toString('base64')

    const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64
    const newProductDb = await product_model.create(newProduct)
    const responseIMG = await handleUpload(dataURI, newProductDb._id)
    newProductDb.image = responseIMG.url
    const responseUpdate = await product_model.update(newProductDb._id, newProductDb)

    res.send(responseUpdate)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    if (req.file == null || req.file === undefined) {
      throw new Error('Arquivo não encontrado')
    }
    const { id } = req.params
    const newProduct = req.body
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64
    const responseIMG = await handleUpload(dataURI, id)
    newProduct.image = responseIMG.url

    const responseUpdate = await product_model.update(id, newProduct)

    res.send(responseUpdate)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default router
