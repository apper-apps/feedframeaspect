import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ClientSidebar from "@/components/organisms/ClientSidebar"
import FeedList from "@/components/organisms/FeedList"
import FeedConfiguration from "@/components/organisms/FeedConfiguration"
import FeedPreview from "@/components/organisms/FeedPreview"
import EmbedCodeDisplay from "@/components/organisms/EmbedCodeDisplay"
import clientService from "@/services/api/clientService"

const Dashboard = () => {
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedFeed, setSelectedFeed] = useState(null)
  const [feedSettings, setFeedSettings] = useState(null)
  const { clientId } = useParams()

  // Load client data when clientId changes
  useEffect(() => {
    const loadClient = async () => {
      if (clientId) {
        try {
const client = await clientService.getById(parseInt(clientId))
          setSelectedClient(client)
        } catch (err) {
          console.error("Failed to load client:", err)
        }
      } else {
        setSelectedClient(null)
        setSelectedFeed(null)
        setFeedSettings(null)
      }
    }
    
    loadClient()
  }, [clientId])

  const handleClientSelect = (client) => {
    setSelectedClient(client)
    setSelectedFeed(null)
    setFeedSettings(null)
  }

  const handleFeedSelect = (feed) => {
    setSelectedFeed(feed)
    setFeedSettings(feed?.settings || null)
  }

  const handleFeedUpdate = (updatedFeed) => {
    setSelectedFeed(updatedFeed)
    setFeedSettings(updatedFeed.settings)
  }

  const handleFeedDeleted = (feedId) => {
    if (selectedFeed?.Id === feedId) {
      setSelectedFeed(null)
      setFeedSettings(null)
    }
  }

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <ClientSidebar onClientSelect={handleClientSelect} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <ClientSidebar onClientSelect={handleClientSelect} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Feed List */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <FeedList
            clientId={clientId}
            selectedFeed={selectedFeed}
            onFeedSelect={handleFeedSelect}
            onFeedDeleted={handleFeedDeleted}
          />
        </div>

        {/* Right Panel - Configuration and Preview */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration */}
              <div className="space-y-6">
                <FeedConfiguration
                  clientId={clientId}
                  selectedFeed={selectedFeed}
                  onFeedUpdate={handleFeedUpdate}
                />
                
                <EmbedCodeDisplay feed={selectedFeed} />
              </div>

              {/* Preview */}
              <div>
                <FeedPreview
                  feed={selectedFeed}
                  settings={feedSettings}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard