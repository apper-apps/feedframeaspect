import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { useSelector } from "react-redux"
import LanguageSelector from "@/components/molecules/LanguageSelector"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { AuthContext } from "../../App"
import React from "react"

const LogoutButton = () => {
  const { logout } = useContext(AuthContext)
  const { user } = useSelector((state) => state.user)
  
  if (!user) return null
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={logout}
      className="flex items-center gap-2"
    >
      <ApperIcon name="LogOut" size={16} />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  )
}
function Layout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 bg-instagram-gradient rounded-lg flex items-center justify-center">
                                    <ApperIcon name="Code" size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold font-display instagram-gradient-text">
                                        {t("app.title")}
                                    </h1>
                                    <p className="text-sm text-gray-500">{t("app.subtitle")}</p>
                                </div>
</div>
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                    <ApperIcon name="Zap" size={16} className="text-instagram-orange" />
                                    <span>{t("app.tagline")}</span>
                                </div>
                                <LanguageSelector />
                                <LogoutButton />
                            </div>
                        </div>
                    </header>
                    {/* Main Content */}
                    <main className="flex-1">
                        <Outlet />
                    </main>
                </div></div></div></div></div>
  )
}

export default Layout