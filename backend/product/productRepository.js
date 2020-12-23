const AbstractRepository = require("../common/abstractRepository");

class ProductRepository extends AbstractRepository {
    constructor(collection) {
        super(collection)
    }
}

module.exports = ProductRepository