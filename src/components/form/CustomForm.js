import React, { useState } from 'react'

const DisplayErrorCtx = React.createContext(false)

const CustomForm = ({
  children,
  onSubmit = () => {},
  submitLabel = 'Valider',
  cancelLabel = 'Annuler',
  className = '',
  disabled = false,
  isLoading = false,
  onCancel = null,
  errorMessage = null
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
        {displayError && <p className="informations danger">{errorMessage}</p>}
        <div className="form-buttons-container">
          <button disabled={disabled} className="button button-uca-blue">
            <span>{submitLabel}</span>
            {isLoading && (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            )}
          </button>
          {onCancel != null && (
            <button
              className="button button-uca-beige"
              type="button"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          )}
        </div>
      </form>
    </DisplayErrorCtx.Provider>
  )
}

export { DisplayErrorCtx }
export default CustomForm
