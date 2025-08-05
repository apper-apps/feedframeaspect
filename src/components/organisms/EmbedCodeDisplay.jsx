import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import CodeBlock from "@/components/molecules/CodeBlock"
import ApperIcon from "@/components/ApperIcon"

const EmbedCodeDisplay = ({ feed }) => {
  if (!feed?.embedCode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ApperIcon name="Code" size={20} className="text-instagram-purple" />
            Embed Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <div className="text-center">
              <ApperIcon name="Code2" size={32} className="text-gray-400 mb-2 mx-auto" />
              <p className="text-gray-500">Save feed configuration to generate embed code</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ApperIcon name="Code" size={20} className="text-instagram-purple" />
          Embed Code
          <span className="text-sm font-normal text-gray-500">
            Copy and paste into your website
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <ApperIcon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">How to use:</p>
                <p className="text-blue-800">
                  Copy the code below and paste it into your HTML where you want the Instagram feed to appear.
                  The feed will automatically load and display the latest posts.
                </p>
              </div>
            </div>
          </div>
          
          <CodeBlock 
            code={feed.embedCode}
            language="html"
          />
          
          <div className="text-xs text-gray-500 border-t pt-4">
            <p>
              <strong>Note:</strong> This embed code includes all your current settings. 
              If you change the configuration, you'll need to update the embed code on your website.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EmbedCodeDisplay