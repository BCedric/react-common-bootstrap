import React, { useState } from 'react'

import { Link } from 'react-router-dom'

const DisplayErrorCtx = React.createContext(false)

const CustomForm = ({
  children,
  onSubmit = () => {},
  submitLabel = 'Valider',
  cancelLabel = 'Annuler',
  cancelLink,
  className = '',
  disabled = false,
  isLoading = false
}) => {
  const [displayError, setDisplayError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    !displayError && setDisplayError(true)
    onSubmit(e)
  }

  return (
    <DisplayErrorCtx.Provider value={displayError}>
      <form onSubmit={submit} className={className}>
        {children}
        <div className="form-buttons-container">
          <button disabled={disabled} className="btn btn-primary">
            <span>{submitLabel}</span>
            {isLoading && (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            )}
          </button>
          {cancelLink && (
            <Link to={cancelLink}>
              <button className="btn" type="button">
                {cancelLabel}
              </button>
            </Link>
          )}
        </div>
      </form>
    </DisplayErrorCtx.Provider>
  )
}

export { DisplayErrorCtx }
export default CustomForm
