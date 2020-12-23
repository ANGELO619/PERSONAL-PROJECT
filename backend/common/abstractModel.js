class AbstractModel {
    createdAt
    updatedAt

    toObject() {
        return Object.keys(this).reduce((obj, key) => {
            obj[key] = this[key]
            return obj
        }, {})
    }
}

module.exports = AbstractModel