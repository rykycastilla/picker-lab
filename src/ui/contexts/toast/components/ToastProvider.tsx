import { ReactElement, ReactNode } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'
import './ToastProvider.css'

interface ToastProviderProps {
  children: ReactNode
}

const ToastProvider = ( props:ToastProviderProps ): ReactElement => {
  const { children } = props
  return (
    <>
      { children }
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={ 1000 }
        closeButton={ false }
        transition={ Zoom }
        toastClassName="toast-provider"
        toastStyle={ {
          width: 'max-content',
          borderRadius: 30,
          transform: 'scale( 0.8 )',
          backdropFilter: 'blur(10px)',
        } } />
    </>
  )
}

export default ToastProvider
