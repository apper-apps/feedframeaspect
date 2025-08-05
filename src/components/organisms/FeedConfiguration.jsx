import { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Label from "@/components/atoms/Label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"
import feedService from "@/services/api/feedService"
import { toast } from "react-toastify"

const FeedConfiguration = ({ clientId, selectedFeed, onFeedUpdate }) => {
  const [username, setUsername] = useState("")
  const [settings, setSettings] = useState({
    layout: "grid",
    postsCount: 6,
    columns: 3,
    spacing: 16,
    borderRadius: 8,
    showCaptions: true
  })
  const [apiSettings, setApiSettings] = useState({
    accessToken: "",
    appId: "",
    appSecret: "",
    useRealApi: false
  })
  const [showApiSettings, setShowApiSettings] = useState(false)
  const [saving, setSaving] = useState(false)

useEffect(() => {
    if (selectedFeed) {
      setUsername(selectedFeed.username || "")
      setSettings(selectedFeed.settings || settings)
      setApiSettings(selectedFeed.apiSettings || {
        accessToken: "",
        appId: "",
        appSecret: "",
        useRealApi: false
      })
    } else {
      setUsername("")
      setSettings({
        layout: "grid",
        postsCount: 6,
        columns: 3,
        spacing: 16,
        borderRadius: 8,
        showCaptions: true
      })
      setApiSettings({
        accessToken: "",
        appId: "",
        appSecret: "",
        useRealApi: false
      })
    }
  }, [selectedFeed])

  const generateEmbedCode = (feedData) => {
    const { username, settings } = feedData
    return `<!-- FeedFrame Instagram Embed -->
<div class="feedframe-embed" 
     data-username="${username}"
     data-layout="${settings.layout}"
     data-posts="${settings.postsCount}"
     data-columns="${settings.columns}"
     data-spacing="${settings.spacing}"
     data-radius="${settings.borderRadius}"
     data-captions="${settings.showCaptions}">
</div>
<script src="https://cdn.feedframe.com/embed.js"></script>`
  }

const handleSave = async () => {
    if (!username.trim()) {
      toast.error("Please enter an Instagram username")
      return
    }

    if (!clientId) {
      toast.error("Please select a client first")
      return
    }

    // Validate API settings if using real API
    if (apiSettings.useRealApi) {
      if (!apiSettings.accessToken.trim()) {
        toast.error("Please enter Instagram Access Token")
        return
      }
      if (!apiSettings.appId.trim()) {
        toast.error("Please enter Instagram App ID")
        return
      }
    }

    setSaving(true)
    try {
      const feedData = {
        clientId: parseInt(clientId),
        username: username.trim(),
        settings: { ...settings },
        apiSettings: { ...apiSettings },
        embedCode: generateEmbedCode({ username: username.trim(), settings }),
        updatedAt: new Date().toISOString()
      }

      let updatedFeed
      if (selectedFeed) {
        updatedFeed = await feedService.update(selectedFeed.Id, feedData)
        toast.success("Feed updated successfully!")
      } else {
        updatedFeed = await feedService.create(feedData)
        toast.success("Feed created successfully!")
      }

      // Ensure callback is called to refresh parent components
      if (onFeedUpdate && typeof onFeedUpdate === 'function') {
        onFeedUpdate(updatedFeed)
      }
    } catch (err) {
      console.error('Feed save error:', err)
      toast.error(err.message || "Failed to save feed")
    } finally {
      setSaving(false)
    }
  }

const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleApiSettingChange = (key, value) => {
    setApiSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ApperIcon name="Settings" size={20} className="text-instagram-purple" />
          Feed Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instagram API Settings */}
        <div className="border rounded-lg p-4 bg-gradient-to-r from-instagram-purple/5 to-instagram-pink/5">
          <button
            type="button"
            onClick={() => setShowApiSettings(!showApiSettings)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <ApperIcon name="Key" size={16} className="text-instagram-purple" />
              <span className="font-medium text-sm">Instagram API Configuration</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                apiSettings.useRealApi 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {apiSettings.useRealApi ? 'Live API' : 'Mock Data'}
              </span>
            </div>
            <ApperIcon 
              name={showApiSettings ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-gray-500" 
            />
          </button>
          
          {showApiSettings && (
            <div className="mt-4 space-y-4 border-t pt-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="useRealApi"
                  checked={apiSettings.useRealApi}
                  onChange={(e) => handleApiSettingChange('useRealApi', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="useRealApi" className="text-sm">
                  Use Instagram Basic Display API (instead of mock data)
                </Label>
              </div>
              
              {apiSettings.useRealApi && (
                <>
                  <FormField label="Instagram Access Token">
                    <Input
                      type="password"
                      placeholder="Enter your Instagram Access Token"
                      value={apiSettings.accessToken}
                      onChange={(e) => handleApiSettingChange('accessToken', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Get this from your Instagram Basic Display API app
                    </p>
                  </FormField>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="App ID">
                      <Input
                        type="text"
                        placeholder="Instagram App ID"
                        value={apiSettings.appId}
                        onChange={(e) => handleApiSettingChange('appId', e.target.value)}
                      />
                    </FormField>
                    
                    <FormField label="App Secret">
                      <Input
                        type="password"
                        placeholder="Instagram App Secret"
                        value={apiSettings.appSecret}
                        onChange={(e) => handleApiSettingChange('appSecret', e.target.value)}
                      />
                    </FormField>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <ApperIcon name="Info" size={16} className="text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Instagram API Setup Required</p>
                        <p className="text-xs leading-relaxed">
                          Create an Instagram Basic Display API app at{' '}
                          <a 
                            href="https://developers.facebook.com/apps/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-900"
                          >
                            developers.facebook.com
                          </a>
                          {' '}and add Instagram Basic Display product to get your credentials.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <FormField label="Instagram Username">
          <Input
            type="text"
            placeholder="e.g. @username or username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Layout Style">
            <Select
              value={settings.layout}
              onChange={(e) => handleSettingChange("layout", e.target.value)}
            >
              <option value="grid">Grid</option>
              <option value="carousel">Carousel</option>
              <option value="list">List</option>
            </Select>
          </FormField>

          <FormField label="Posts Count">
            <Select
              value={settings.postsCount}
              onChange={(e) => handleSettingChange("postsCount", parseInt(e.target.value))}
            >
              {[1,2,3,4,5,6,8,9,12].map(num => (
                <option key={num} value={num}>{num} posts</option>
              ))}
            </Select>
          </FormField>
        </div>

        {settings.layout === "grid" && (
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Columns">
              <Select
                value={settings.columns}
                onChange={(e) => handleSettingChange("columns", parseInt(e.target.value))}
              >
                <option value={1}>1 column</option>
                <option value={2}>2 columns</option>
                <option value={3}>3 columns</option>
                <option value={4}>4 columns</option>
              </Select>
            </FormField>

            <FormField label="Spacing (px)">
              <Input
                type="number"
                min="0"
                max="50"
                value={settings.spacing}
                onChange={(e) => handleSettingChange("spacing", parseInt(e.target.value) || 0)}
              />
            </FormField>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Border Radius (px)">
            <Input
              type="number"
              min="0"
              max="50"
              value={settings.borderRadius}
              onChange={(e) => handleSettingChange("borderRadius", parseInt(e.target.value) || 0)}
            />
          </FormField>

          <div className="space-y-2">
            <Label>Show Captions</Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showCaptions"
                checked={settings.showCaptions}
                onChange={(e) => handleSettingChange("showCaptions", e.target.checked)}
                className="rounded border-gray-300 text-instagram-purple focus:ring-instagram-purple"
              />
              <Label htmlFor="showCaptions" className="font-normal">
                Include post captions
              </Label>
            </div>
          </div>
        </div>

<Button
          onClick={handleSave}
          disabled={saving || !username.trim() || !clientId}
          className="w-full"
          variant="primary"
        >
          {saving ? (
            <>
              <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name="Save" size={16} className="mr-2" />
              {selectedFeed ? "Update Feed" : "Create Feed"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default FeedConfiguration