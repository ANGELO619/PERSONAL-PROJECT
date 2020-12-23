class CartController {

    constructor(cartRepository) {
        this.cartRepository = cartRepository
    }

    async create(req, res) {
        try {
            const cart = await this.cartRepository.create(req.body)
            res.json(cart)
        } catch (e) {
            req.status(500).end()
        }
    }

    async update(req, res) {
        try {
            await this.cartRepository.update(req.params.cartId, req.body)
            res.send(200)
        } catch (e) {
            req.status(500).end()
        }
    }

    async remove(req, res) {
        try {
            await this.cartRepository.remive(req.params.cartId)
        } catch (e) {
            req.status(500).end()
        }
    }
}

module.exports = CartController