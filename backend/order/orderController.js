class OrderController {

    constructor(orderRepository) {
        this.orderRepository = orderRepository
    }

    async create(req, res) {
        try {
            const order = await this.orderRepository.create(req.body)
            res.json(order)
        } catch (e) {
            req.status(500).end()
        }
    }

    async update(req, res) {
        try {
            await this.orderRepository.update(req.params.orderId, req.body)
            res.send(200)
        } catch (e) {
            req.status(500).end()
        }
    }

    async remove(req, res) {
        try {
            await this.orderRepository.remive(req.params.orderId)
        } catch (e) {
            req.status(500).end()
        }
    }
}

module.exports = OrderController