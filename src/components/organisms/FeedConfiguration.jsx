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
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (selectedFeed) {
      setUsername(selectedFeed.username || "")
      setSettings(selectedFeed.settings || settings)
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

    setSaving(true)
    try {
      const feedData = {
        clientId: parseInt(clientId),
        username: username.trim(),
        settings: settings,
        embedCode: generateEmbedCode({ username: username.trim(), settings })
      }

      let updatedFeed
      if (selectedFeed) {
        updatedFeed = await feedService.update(selectedFeed.Id, feedData)
        toast.success("Feed updated successfully!")
      } else {
        updatedFeed = await feedService.create(feedData)
        toast.success("Feed created successfully!")
      }

      onFeedUpdate?.(updatedFeed)
    } catch (err) {
      toast.error("Failed to save feed")
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

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ApperIcon name="Settings" size={20} className="text-instagram-purple" />
          Feed Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
          disabled={saving || !username.trim()}
          className="w-full"
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