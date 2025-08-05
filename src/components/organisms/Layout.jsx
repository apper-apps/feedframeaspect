import { Outlet } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-instagram-gradient rounded-lg flex items-center justify-center">
              <ApperIcon name="Code" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display instagram-gradient-text">
                FeedFrame
              </h1>
              <p className="text-sm text-gray-500">Instagram Feed Embeds</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Zap" size={16} className="text-instagram-orange" />
              <span>Generate • Preview • Embed</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout