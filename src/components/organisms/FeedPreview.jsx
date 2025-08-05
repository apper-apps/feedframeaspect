import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card'
import DeviceToggle from '@/components/molecules/DeviceToggle'
import ApperIcon from '@/components/ApperIcon'
import instagramPostsService from '@/services/api/instagramPostsService'

const FeedPreview = ({ feed, settings }) => {
  const [activeDevice, setActiveDevice] = useState("desktop")
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
// Import the Instagram posts service

  // Fetch posts when feed changes
React.useEffect(() => {
    if (feed?.username) {
      setLoading(true)
      setError(null)
      
      const postsCount = settings?.postsCount || 6
      
      instagramPostsService.getPostsByUsername(feed.username, postsCount)
        .then(fetchedPosts => {
          setPosts(fetchedPosts)
          setError(null)
        })
        .catch(err => {
          console.error('Failed to fetch Instagram posts:', err)
          setError(`Unable to load posts for @${feed.username}. Showing preview with simulated content.`)
          // Still show mock posts for preview purposes
          return instagramPostsService.getPostsByUsername(feed.username, postsCount)
            .then(mockPosts => setPosts(mockPosts))
            .catch(() => setPosts([]))
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setPosts([])
      setLoading(false)
      setError(null)
    }
  }, [feed?.username, settings?.postsCount])

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

  const postsToShow = posts

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
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-600">Loading Instagram posts...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500 mb-2" />
                  <p className="text-sm text-red-600 mb-2">Failed to load posts</p>
                  <p className="text-xs text-gray-500">{error}</p>
                </div>
              ) : postsToShow.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ApperIcon name="Instagram" className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">No posts found</p>
                  <p className="text-xs text-gray-500">Check the Instagram username</p>
                </div>
              ) : (
<div className={getLayoutClasses()}>
                  {postsToShow.map((post) => (
                    <div key={post.id} className={getItemClasses()}>
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.caption}
                          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
                            settings?.layout === "list" ? "w-16 h-16 rounded-lg" : ""
                          }`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/400x400/E4405F/FFFFFF?text=@${feed.username}`
                          }}
                        />
                        {settings?.layout !== "list" && (
                          <div className="absolute top-2 right-2 bg-black/20 rounded-full p-1">
                            <ApperIcon name="Heart" size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                      {settings?.showCaptions && (
                        <div className={settings.layout === "list" ? "flex-1 ml-3" : "p-2"}>
                          <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                            {post.caption}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <span>{post.likes} likes</span>
                            <span className="mx-2">•</span>
                            <span>{post.comments} comments</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FeedPreview