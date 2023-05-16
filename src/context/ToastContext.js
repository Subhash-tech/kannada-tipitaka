import React, { createContext, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = createContext()

export function useToast() {
  return useContext(Toast)
}

const ToastContext = ({ children }) => {
  const showNotification = (
    message,
    variant = 'error',
    position = 'TOP_RIGHT'
  ) => {
    toast[variant](message, {
      position: toast.POSITION[position],
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
    })
  }
  return (
    <Toast.Provider value={{ showNotification }}>
      {children}
      <ToastContainer />
    </Toast.Provider>
  )
}

export default ToastContext
