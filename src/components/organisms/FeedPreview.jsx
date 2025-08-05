import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import DeviceToggle from "@/components/molecules/DeviceToggle"
import ApperIcon from "@/components/ApperIcon"

const FeedPreview = ({ feed, settings }) => {
  const [activeDevice, setActiveDevice] = useState("desktop")

  const mockPosts = [
    { id: 1, image: "https://picsum.photos/300/300?random=1", caption: "Beautiful sunset at the beach 🌅" },
    { id: 2, image: "https://picsum.photos/300/300?random=2", caption: "Coffee and code ☕️💻" },
    { id: 3, image: "https://picsum.photos/300/300?random=3", caption: "Weekend vibes 🎉" },
    { id: 4, image: "https://picsum.photos/300/300?random=4", caption: "Nature photography 📸" },
    { id: 5, image: "https://picsum.photos/300/300?random=5", caption: "Urban exploration 🏙️" },
    { id: 6, image: "https://picsum.photos/300/300?random=6", caption: "Food adventures 🍕" },
    { id: 7, image: "https://picsum.photos/300/300?random=7", caption: "Travel memories ✈️" },
    { id: 8, image: "https://picsum.photos/300/300?random=8", caption: "Art and inspiration 🎨" },
    { id: 9, image: "https://picsum.photos/300/300?random=9", caption: "Fitness journey 💪" },
  ]

  const deviceSizes = {
    desktop: "w-full max-w-4xl",
    tablet: "w-full max-w-2xl",
    mobile: "w-full max-w-sm"
  }

  const getLayoutClasses = () => {
    if (!settings) return ""
    
    const { layout, columns, spacing } = settings
    
    if (layout === "grid") {
      return `grid grid-cols-${columns} gap-${Math.floor(spacing / 4)}`
    } else if (layout === "carousel") {
      return "flex overflow-x-auto space-x-4 pb-4"
    } else {
      return "space-y-4"
    }
  }

  const getItemClasses = () => {
    if (!settings) return ""
    
    const { layout, borderRadius } = settings
    const radiusClass = borderRadius > 0 ? `rounded-${borderRadius <= 4 ? 'sm' : borderRadius <= 8 ? 'md' : 'lg'}` : ""
    
    if (layout === "carousel") {
      return `flex-shrink-0 w-64 ${radiusClass}`
    } else if (layout === "list") {
      return `flex items-center space-x-4 p-4 border border-gray-200 ${radiusClass}`
    }
    
    return `aspect-square overflow-hidden ${radiusClass}`
  }

  const postsToShow = settings ? mockPosts.slice(0, settings.postsCount) : mockPosts.slice(0, 6)

  if (!feed && !settings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ApperIcon name="Eye" size={20} className="text-instagram-purple" />
            Feed Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <ApperIcon name="Instagram" size={48} className="text-gray-400 mb-4 mx-auto" />
              <p className="text-gray-500">Configure a feed to see preview</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ApperIcon name="Eye" size={20} className="text-instagram-purple" />
            Feed Preview
            {feed?.username && (
              <span className="text-sm font-normal text-gray-500">
                @{feed.username}
              </span>
            )}
          </CardTitle>
          <DeviceToggle 
            activeDevice={activeDevice}
            onDeviceChange={setActiveDevice}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className={`${deviceSizes[activeDevice]} transition-all duration-300`}>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className={getLayoutClasses()}>
                {postsToShow.map((post) => (
                  <div key={post.id} className={getItemClasses()}>
                    <img
                      src={post.image}
                      alt={post.caption}
                      className={`w-full h-full object-cover ${
                        settings?.layout === "list" ? "w-16 h-16 rounded-lg" : ""
                      }`}
                    />
                    {settings?.showCaptions && (
                      <div className={settings.layout === "list" ? "flex-1" : "p-2"}>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {post.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FeedPreview