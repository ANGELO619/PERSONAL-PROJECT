const AbstractModel = require("../common/abstractModel");

class Product extends AbstractModel {
	id
	name
	description
	image
	price
	options
	countInStock
	category

	constructor({
		id,
		name,
		description,
		price,
		options,
		countInStock,
		category,
		image
	}) {
		this.id = id
		this.name = name
		this.description = description
		this.price = price
		this.stock = stock
		this.options = options
		this.countInStock = countInStock
		this.category = category
		this.image = image
	}
}

module.exports = Product