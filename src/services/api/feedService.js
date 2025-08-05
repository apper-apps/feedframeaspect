import feedsData from "@/services/mockData/feeds.json"

let feeds = [...feedsData]

const feedService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...feeds]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const feed = feeds.find(f => f.Id === id)
    if (!feed) {
      throw new Error("Feed not found")
    }
    return { ...feed }
  },

  async create(feedData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const maxId = feeds.reduce((max, feed) => Math.max(max, feed.Id), 0)
    const newFeed = {
      Id: maxId + 1,
      ...feedData,
      createdAt: new Date().toISOString()
    }
    feeds.push(newFeed)
    return { ...newFeed }
  },

  async update(id, feedData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = feeds.findIndex(f => f.Id === id)
    if (index === -1) {
      throw new Error("Feed not found")
    }
    feeds[index] = { ...feeds[index], ...feedData }
    return { ...feeds[index] }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = feeds.findIndex(f => f.Id === id)
    if (index === -1) {
      throw new Error("Feed not found")
    }
    feeds.splice(index, 1)
    return true
  }
}

export default feedService