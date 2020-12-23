class AbstractRepository {
    constructor(collection) {
        this.collection = collection
    }

    async find() {
        const snapshot = await this.collection.get()
        const result = snapshot.docs.map(doc => doc.data())
        return result
    }
    async findOne(id) {
        const query = await this.collection.doc(id).get()
        return query.data()
    }
    async create(payload) {
        const added = await this.collection.add({
            ...payload,
            createdAt: new Date()
        })
        const snapshot = await added.get()
        await snapshot.ref.update({ id: snapshot.id })
        return (await snapshot.ref.get()).data()
    }
    async update(id, payload) {
        return await this.collection.doc(id).set({
            ...payload
        }, { merge: true })
    }
    async remove(id) {
        return await this.collection.doc(id).delete()
    }
}

module.exports = AbstractRepository