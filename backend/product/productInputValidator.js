class ProductInputValidator {
    constructor() { }

    makeException(status, message) {
        return {
            status,
            message
        }
    }

    validateCreateProductInput(req, res, next) {
        if (!req.body) {
            res.status(400).send(this.makeException(400, `missing body.`))
        }
        const {
            name,
            price,
            category,
        } = req.body
        if (!name) {
            res.status(400).send(this.makeException(400, `missing name.`))
        }

        if (!price) {
            res.status(400).send(this.makeException(400, `missing price.`))
        }

        if (!category) {
            res.status(400).send(this.makeException(400, `missing category.`))
        }

        next()
    }

    validateUpdateProductInput(req, res, next) {
        if (!req.body) {
            res.status(400).send(this.makeException(400, `missing body.`))
        }

        if (!req.params.productId) {
            res.status(400).send(this.makeException(400, `missing product id.`))
        }

        next()
    }


    validateRemoveProductInput(req, res, next) {
        if (!req.params.productId) {
            res.status(400).send(this.makeException(400, `missing product id.`))
        }

        next()
    }
}

module.exports = ProductInputValidator