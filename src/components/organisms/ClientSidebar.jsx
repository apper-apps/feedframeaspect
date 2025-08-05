import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "@/components/atoms/Button"
import { Card } from "@/components/atoms/Card"
import SearchBar from "@/components/molecules/SearchBar"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import clientService from "@/services/api/clientService"
import { toast } from "react-toastify"

const ClientSidebar = ({ onClientSelect }) => {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newClientName, setNewClientName] = useState("")
  
  const navigate = useNavigate()
  const { clientId } = useParams()

  const loadClients = async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await clientService.getAll()
      setClients(data)
      setFilteredClients(data)
    } catch (err) {
      setError("Failed to load clients")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  useEffect(() => {
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredClients(filtered)
  }, [clients, searchTerm])

  const handleAddClient = async (e) => {
    e.preventDefault()
    if (!newClientName.trim()) return

    try {
      const newClient = await clientService.create({
        name: newClientName.trim(),
        feeds: []
      })
      setClients([...clients, newClient])
      setNewClientName("")
      setShowAddForm(false)
      toast.success("Client added successfully!")
      navigate(`/client/${newClient.Id}`)
      onClientSelect?.(newClient)
    } catch (err) {
      toast.error("Failed to add client")
    }
  }

  const handleClientSelect = (client) => {
    navigate(`/client/${client.Id}`)
    onClientSelect?.(client)
  }

  if (loading) return <Loading className="p-6" />
  if (error) return <Error message={error} onRetry={loadClients} className="p-6" />

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Clients</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddForm(true)}
          >
            <ApperIcon name="Plus" size={16} />
          </Button>
        </div>
        
        <SearchBar
          placeholder="Search clients..."
          onSearch={setSearchTerm}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {showAddForm && (
          <Card className="mb-4 p-4">
            <form onSubmit={handleAddClient} className="space-y-3">
              <input
                type="text"
                placeholder="Client name"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-instagram-purple"
                autoFocus
              />
              <div className="flex gap-2">
                <Button type="submit" size="sm" variant="primary">
                  Add
                </Button>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewClientName("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {filteredClients.length === 0 ? (
          <Empty
            title="No clients yet"
            description="Add your first client to start creating Instagram feed embeds"
            actionLabel="Add Client"
            onAction={() => setShowAddForm(true)}
            icon="Users"
          />
        ) : (
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <Card
                key={client.Id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  clientId === client.Id.toString() 
                    ? "ring-2 ring-instagram-purple bg-gradient-to-r from-instagram-purple/5 to-instagram-pink/5" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleClientSelect(client)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-500">
                      {client.feeds?.length || 0} feeds
                    </p>
                  </div>
                  <ApperIcon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-gray-400" 
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientSidebar