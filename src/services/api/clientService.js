import clientsData from "@/services/mockData/clients.json"

let clients = [...clientsData]

const clientService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...clients]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const client = clients.find(c => c.Id === id)
    if (!client) {
      throw new Error("Client not found")
    }
    return { ...client }
  },

  async create(clientData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const maxId = clients.reduce((max, client) => Math.max(max, client.Id), 0)
    const newClient = {
      Id: maxId + 1,
      ...clientData,
      createdAt: new Date().toISOString(),
      feeds: []
    }
    clients.push(newClient)
    return { ...newClient }
  },

  async update(id, clientData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = clients.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error("Client not found")
    }
    clients[index] = { ...clients[index], ...clientData }
    return { ...clients[index] }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = clients.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error("Client not found")
    }
    clients.splice(index, 1)
    return true
  }
}

export default clientService