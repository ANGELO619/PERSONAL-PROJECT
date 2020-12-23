const AbstractRepository = require("../common/abstractRepository");

class OrderRepository extends AbstractRepository {
    constructor(collection) {
        super(collection)
    }
}

module.exports = OrderRepository