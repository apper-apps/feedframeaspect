import { useState } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ placeholder = "Search...", onSearch, className }) => {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch?.(newValue)
  }

  return (
    <div className={`relative ${className}`}>
      <ApperIcon 
        name="Search" 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}

export default SearchBar