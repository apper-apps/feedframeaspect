import React from "react"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import App from "@/App.jsx"
import "@/index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastStyle={{
        fontSize: "14px",
        padding: "16px"
      }}
    />
  </>
)