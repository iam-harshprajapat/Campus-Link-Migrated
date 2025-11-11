"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import Notification from "./notification"

interface NotificationContextType {
  showNotification: (message: string, type?: "success" | "error" | "info", duration?: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null)
  const [visible, setVisible] = useState(false)

  const showNotification = useCallback(
    (message: string, type: "success" | "error" | "info" = "info", duration = 3000) => {
      setNotification({ message, type })
      setVisible(true)
      setTimeout(() => setVisible(false), duration)
    },
    []
  )

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        message={notification?.message || ""}
        type={notification?.type}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </NotificationContext.Provider>
  )
}
