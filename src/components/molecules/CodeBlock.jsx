import { useState } from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

const CodeBlock = ({ code, language = "html" }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("Embed code copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy code")
    }
  }

  return (
    <div className="relative">
      <div className="code-highlight rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100">
          <code>{code}</code>
        </pre>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white"
      >
        <ApperIcon 
          name={copied ? "Check" : "Copy"} 
          size={16} 
          className={copied ? "text-green-400" : "text-white"}
        />
      </Button>
    </div>
  )
}

export default CodeBlock