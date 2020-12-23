const AbstractRepository = require("../common/abstractRepository");

class CartRepository extends AbstractRepository {
    constructor(collection) {
        super(collection)
    }
}

module.exports = CartRepository