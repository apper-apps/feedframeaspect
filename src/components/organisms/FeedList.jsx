import { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import feedService from "@/services/api/feedService"
import { toast } from "react-toastify"

const FeedList = ({ clientId, selectedFeed, onFeedSelect, onFeedDeleted, refreshTrigger }) => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const loadFeeds = async () => {
    if (!clientId) {
      setFeeds([])
      return
    }
    
    try {
      setError(null)
      setLoading(true)
      const allFeeds = await feedService.getAll()
      const clientFeeds = allFeeds.filter(feed => feed.clientId === parseInt(clientId))
      setFeeds(clientFeeds)
    } catch (err) {
      console.error('Failed to load feeds:', err)
      setError("Failed to load feeds")
    } finally {
      setLoading(false)
    }
  }

  // Refresh feeds when client changes or when refreshTrigger changes
  useEffect(() => {
    loadFeeds()
  }, [clientId, refreshTrigger])

  const handleDeleteFeed = async (feedId) => {
    if (!confirm("Are you sure you want to delete this feed?")) return

    setDeletingId(feedId)
    try {
      await feedService.delete(feedId)
      setFeeds(feeds.filter(feed => feed.Id !== feedId))
      toast.success("Feed deleted successfully!")
      onFeedDeleted?.(feedId)
    } catch (err) {
      toast.error("Failed to delete feed")
    } finally {
      setDeletingId(null)
    }
  }

  if (!clientId) {
    return (
      <Card>
        <CardContent className="p-6">
          <Empty
            title="Select a client"
            description="Choose a client from the sidebar to view and manage their Instagram feeds"
            icon="Users"
          />
        </CardContent>
      </Card>
    )
  }

  if (loading) return <Loading className="p-6" />
  if (error) return <Error message={error} onRetry={loadFeeds} className="p-6" />

  if (feeds.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <Empty
            title="No feeds yet"
            description="Create your first Instagram feed embed for this client"
            actionLabel="Create Feed"
            onAction={() => onFeedSelect?.(null)}
            icon="Instagram"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Instagram Feeds ({feeds.length})
        </h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onFeedSelect?.(null)}
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Feed
        </Button>
      </div>

      <div className="space-y-3">
        {feeds.map((feed) => (
          <Card
            key={feed.Id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedFeed?.Id === feed.Id 
                ? "ring-2 ring-instagram-purple bg-gradient-to-r from-instagram-purple/5 to-instagram-pink/5" 
                : "hover:bg-gray-50"
            }`}
            onClick={() => onFeedSelect?.(feed)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-instagram-gradient rounded-lg flex items-center justify-center">
                    <ApperIcon name="Instagram" size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">@{feed.username}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="capitalize">{feed.settings?.layout || "grid"} layout</span>
                      <span>{feed.settings?.postsCount || 6} posts</span>
                      {feed.settings?.layout === "grid" && (
                        <span>{feed.settings?.columns || 3} columns</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteFeed(feed.Id)
                    }}
                    disabled={deletingId === feed.Id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    {deletingId === feed.Id ? (
                      <ApperIcon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <ApperIcon name="Trash2" size={16} />
                    )}
                  </Button>
                  <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FeedList