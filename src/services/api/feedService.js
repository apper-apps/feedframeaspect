import { toast } from "react-toastify"

const feedService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "clientId"
            }
          },
          {
            field: {
              Name: "username"
            }
          },
          {
            field: {
              Name: "settings"
            }
          },
          {
            field: {
              Name: "embedCode"
            }
          },
          {
            field: {
              Name: "createdAt"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ]
      }
      
      const response = await apperClient.fetchRecords('feed', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      // Parse settings from JSON string and transform clientId lookup
      const feeds = (response.data || []).map(feed => ({
        ...feed,
        Id: feed.Id,
        clientId: feed.clientId?.Id || feed.clientId,
        settings: typeof feed.settings === 'string' ? JSON.parse(feed.settings || '{}') : feed.settings
      }))
      
      return feeds
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching feeds:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "clientId"
            }
          },
          {
            field: {
              Name: "username"
            }
          },
          {
            field: {
              Name: "settings"
            }
          },
          {
            field: {
              Name: "embedCode"
            }
          },
          {
            field: {
              Name: "createdAt"
            }
          }
        ]
      }
      
      const response = await apperClient.getRecordById('feed', id, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.data) {
        return {
          ...response.data,
          clientId: response.data.clientId?.Id || response.data.clientId,
          settings: typeof response.data.settings === 'string' ? JSON.parse(response.data.settings || '{}') : response.data.settings
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching feed with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async create(feedData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        records: [
          {
            Name: feedData.Name || `Feed for @${feedData.username}`,
            Tags: feedData.Tags || "",
            clientId: parseInt(feedData.clientId),
            username: feedData.username,
            settings: typeof feedData.settings === 'object' ? JSON.stringify(feedData.settings) : feedData.settings,
            embedCode: feedData.embedCode,
            createdAt: new Date().toISOString()
          }
        ]
      }
      
      const response = await apperClient.createRecord('feed', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create feeds ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulRecords.length > 0) {
          const createdFeed = successfulRecords[0].data
          return {
            ...createdFeed,
            clientId: createdFeed.clientId?.Id || createdFeed.clientId,
            settings: typeof createdFeed.settings === 'string' ? JSON.parse(createdFeed.settings || '{}') : createdFeed.settings
          }
        }
      }
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating feed:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async update(id, feedData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        records: [
          {
            Id: id,
            Name: feedData.Name || `Feed for @${feedData.username}`,
            Tags: feedData.Tags || "",
            clientId: parseInt(feedData.clientId),
            username: feedData.username,
            settings: typeof feedData.settings === 'object' ? JSON.stringify(feedData.settings) : feedData.settings,
            embedCode: feedData.embedCode
          }
        ]
      }
      
      const response = await apperClient.updateRecord('feed', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update feeds ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulUpdates.length > 0) {
          const updatedFeed = successfulUpdates[0].data
          return {
            ...updatedFeed,
            clientId: updatedFeed.clientId?.Id || updatedFeed.clientId,
            settings: typeof updatedFeed.settings === 'string' ? JSON.parse(updatedFeed.settings || '{}') : updatedFeed.settings
          }
        }
      }
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating feed:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [id]
      }
      
      const response = await apperClient.deleteRecord('feed', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete feeds ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting feed:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return false
    }
  }
}

export default feedService