const AbstractModel = require("../common/abstractModel");

class Cart extends AbstractModel {
    id
    items
    belongTo

    constructor({
        id,
        items,
        belongTo
    }) {
        this.id = id
        this.items = items
        this.belongTo = belongTo
    }
}

module.exports = Cart