// Mock Instagram Posts Service - simulates fetching posts from Instagram API
const instagramPostsService = {
  async getPostsByUsername(username, count = 9) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Simulate potential API errors (2% chance)
    if (Math.random() < 0.02) {
      throw new Error(`Failed to fetch posts for @${username}`)
    }
    
    // Generate consistent posts based on username
    const posts = []
    const baseId = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    for (let i = 0; i < count; i++) {
      const postId = baseId + i
      const imageCategory = getImageCategory(username, i)
      
      posts.push({
        id: postId,
        image: `https://picsum.photos/400/400?random=${postId}&${imageCategory}`,
        caption: generateRealisticCaption(username, i),
        likes: generateRealisticLikes(username, i),
        comments: Math.floor(Math.random() * 50) + 5,
        timestamp: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        username: username
      })
    }
    
    return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }
}

function getImageCategory(username, index) {
  const categories = ['nature', 'architecture', 'food', 'people', 'tech', 'business', 'fashion', 'travel']
  const userSeed = username.length + index
  return categories[userSeed % categories.length]
}

function generateRealisticCaption(username, index) {
  const businessCaptions = [
    "Excited to share our latest project! 🚀 #innovation #growth",
    "Behind the scenes of what we do best ✨ #teamwork #excellence", 
    "Another milestone reached! Thank you to our amazing clients 🙏 #grateful #success",
    "Innovation never stops. Here's what we're working on next 💡 #futureready",
    "Building something special, one step at a time 🏗️ #progress #vision",
    "Our team's dedication continues to inspire 👥 #leadership #culture",
    "Celebrating the wins, big and small 🎉 #achievement #momentum",
    "Quality is never an accident. It's always the result of effort 💪 #craftsmanship",
    "Connecting with our community means everything to us 🤝 #community #values",
    "The future looks bright from where we stand ☀️ #optimism #forward"
  ]
  
  const personalCaptions = [
    "Living life one moment at a time ✨ #blessed #grateful",
    "Coffee, creativity, and endless possibilities ☕ #motivation #inspiration",
    "Making memories that will last forever 📸 #memories #life",
    "Sunshine mixed with a little hurricane 🌪️☀️ #authentic #real",
    "Chasing dreams and catching flights ✈️ #adventure #wanderlust",
    "Good vibes only, always 🌈 #positivity #goodenergy",
    "Creating my own sunshine wherever I go 🌞 #mindset #happiness",
    "Life is beautiful when you find beauty in everything 🌸 #perspective #beauty",
    "Work hard, stay humble, be kind 💫 #values #growth",
    "Every day is a new opportunity to shine ⭐ #motivation #newday"
  ]
  
  // Use business captions for business-sounding usernames
  const isBusinessAccount = /company|corp|inc|llc|agency|studio|consulting|solutions|group|services/i.test(username)
  const captions = isBusinessAccount ? businessCaptions : personalCaptions
  
  return captions[index % captions.length]
}

function generateRealisticLikes(username, index) {
  const baseLikes = username.length * 10
  const variation = Math.floor(Math.random() * 500)
  const followerTier = getFollowerTier(username)
  
  switch(followerTier) {
    case 'micro': return baseLikes + variation + 50    // 50-600 likes
    case 'mid': return baseLikes + variation + 300     // 300-900 likes  
    case 'macro': return baseLikes + variation + 1000  // 1000-1600 likes
    default: return baseLikes + variation + 50
  }
}

function getFollowerTier(username) {
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  if (hash % 3 === 0) return 'macro'
  if (hash % 3 === 1) return 'mid'
  return 'micro'
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