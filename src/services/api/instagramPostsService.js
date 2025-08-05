// Mock Instagram Posts Service - simulates fetching posts from Instagram API
const instagramPostsService = {
  async getPostsByUsername(username, count = 9) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Simulate potential API errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Failed to fetch Instagram posts')
    }
    
    // Generate posts based on username for consistency
    const posts = []
    const baseId = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    for (let i = 0; i < count; i++) {
      const postId = baseId + i
      posts.push({
        id: postId,
        image: `https://picsum.photos/300/300?random=${postId}`,
        caption: generateCaption(username, i),
        likes: Math.floor(Math.random() * 1000) + 50,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      })
    }
    
    return posts
  }
}

function generateCaption(username, index) {
  const captions = [
    `Amazing content from @${username} 🌟`,
    `Check out this incredible shot! 📸`,
    `Living our best life ✨`,
    `Behind the scenes magic 🎬`,
    `Inspiration strikes again 💡`,
    `Creative process in action 🎨`,
    `Weekend adventures await 🌄`,
    `Coffee and creativity ☕️`,
    `Making memories that last 📝`,
    `Dream big, achieve bigger 🚀`,
    `Nature's beauty captured 🌿`,
    `Urban exploration vibes 🏙️`,
    `Food for the soul 🍃`,
    `Art in everyday moments 🖼️`,
    `Sunset thoughts 🌅`
  ]
  
  return captions[index % captions.length]
}

export default instagramPostsService