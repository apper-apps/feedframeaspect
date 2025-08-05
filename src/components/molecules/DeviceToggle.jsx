import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const DeviceToggle = ({ activeDevice, onDeviceChange }) => {
  const devices = [
    { id: "desktop", icon: "Monitor", label: "Desktop" },
    { id: "tablet", icon: "Tablet", label: "Tablet" },
    { id: "mobile", icon: "Smartphone", label: "Mobile" }
  ]

  return (
    <div className="flex gap-2">
      {devices.map((device) => (
        <Button
          key={device.id}
          variant={activeDevice === device.id ? "primary" : "outline"}
          size="sm"
          onClick={() => onDeviceChange(device.id)}
          className="flex items-center gap-2"
        >
          <ApperIcon name={device.icon} size={16} />
          <span className="hidden sm:inline">{device.label}</span>
        </Button>
      ))}
    </div>
  )
}

export default DeviceToggle