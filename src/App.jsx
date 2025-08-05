import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/organisms/Layout"
import Dashboard from "@/components/pages/Dashboard"
import './i18n'

function App() {
return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="client/:clientId" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App