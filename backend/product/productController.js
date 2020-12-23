class ProductController {

    constructor(productRepository) {
        this.productRepository = productRepository
    }

    async create(req, res) {
        try {
            const product = await this.productRepository.create(req.body)
            return res.json(product)
        } catch (e) {
            console.error(e)
            req.status(500).end()
        }
    }

    async update(req, res) {
        try {
            await this.productRepository.update(req.params.productId, req.body)
            return res.send(200)
        } catch (e) {
            console.error(e)
            req.status(500).end()
        }
    }

    async remove(req, res) {
        try {
            await this.productRepository.remove(req.params.productId)
            return res.send(200)
        } catch (e) {
            console.error(e)
            req.status(500).end()
        }
    }
}

module.exports = ProductController