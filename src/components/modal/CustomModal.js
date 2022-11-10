import React, { useEffect } from 'react'

import Modal from 'react-bootstrap/Modal'

const CustomModal = ({
  show = false,
  title = '',
  content = '',
  onValidate = () => {},
  setShow = () => {},
  validateLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  validateDisabled = false
}) => {
  useEffect(() => {}, [])

  const cancel = () => {
    setShow(false)
  }

  const click = () => {
    cancel()
    onValidate()
  }

  return (
    <>
      <Modal show={show} tabIndex="-1">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancel}
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={click}
              disabled={validateDisabled}
            >
              {validateLabel}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CustomModal
