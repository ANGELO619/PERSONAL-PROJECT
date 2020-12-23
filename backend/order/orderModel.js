const AbstractModel = require("../common/abstractModel");

class Order extends AbstractModel {
    id
    details
    status
    shipping
    payment

    constructor({
        id,
        details,
        status,
        shipping,
        payment
    }) {
        this.id = id
        this.details = details
        this.status = status
        this.shipping = shipping
        this.payment = payment
    }
}

module.exports = Order