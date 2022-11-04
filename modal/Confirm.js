import React, { useContext, useMemo, useState } from 'react'
import CustomModal from './CustomModal'
const Confirm = () => {
  const context = useContext(ConfirmContext)

  return (
    <CustomModal
      title={context.title}
      content={context.content}
      cancelLabel="Annuler"
      validateLabel="Confirmer"
      show={context.show}
      onValidate={context.callback}
      setShow={() => context.setContext({ ...context, show: false })}
    />
  )
}

export const ConfirmContext = React.createContext({
  title: '',
  content: '',
  show: false,
  callback: () => {},
  setContext: null
})

export const initConfirm = () => {
  const [confirmOptions, setConfirmOptions] = useState({
    title: 'Confirmation',
    content: '',
    callback: () => {},
    show: false
  })

  const contextValue = useMemo(
    () => ({
      ...confirmOptions,
      setContext: setConfirmOptions
    }),
    [confirmOptions]
  )
  return contextValue
}

export const useConfirm = () => {
  const confirmContext = useContext(ConfirmContext)

  const confirm = (content, callback, title = 'Confirmation') =>
    confirmContext.setContext({ title, content, callback, show: true })
  return confirm
}

export default Confirm
