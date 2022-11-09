import React, { useContext, useRef } from 'react'
import { DisplayErrorCtx } from './CustomForm'

const CustomFormField = ({
  label = null,
  value = null,
  onChange,
  type = 'text',
  selectValues = [],
  className = '',
  name = '',
  disabled = false,
  isValid = true,
  feedback = '',
  emptySelectOption = false,
  prefix = null,
  ...props
}) => {
  const displayError = useContext(DisplayErrorCtx)
  const renderFileInput = () => {
    const fileRef = useRef()

    return (
      <input
        ref={fileRef}
        type="file"
        onChange={(_) => onChange(fileRef.current.files)}
        {...props}
      />
    )
  }

  const renderTextarea = () => (
    <textarea
      className={`form-control ${displayError && !isValid && 'is-invalid'}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      {...props}
    />
  )

  const renderSelect = () => (
    <select
      {...props}
      className={`form-control ${displayError && !isValid && 'is-invalid'}`}
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
    >
      {emptySelectOption && <option value={''}></option>}
      {selectValues.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label == null ? value : label}
        </option>
      ))}
    </select>
  )

  const renderInput = () => (
    <input
      {...props}
      className={`form-control ${displayError && !isValid && 'is-invalid'}`}
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      disabled={disabled}
    />
  )

  const renderCheckbox = () => (
    <div className="form-group form-check custom-checkbox">
      <input
        {...props}
        className={`form-check-input ${
          displayError && !isValid && 'is-invalid'
        }`}
        checked={value}
        onChange={onChange}
        type="checkbox"
        name={name}
        disabled={disabled}
      />
      <label className="form-check-label">{label}</label>
    </div>
  )

  return (
    <div className={className}>
      {label != null && type != 'checkbox' && (
        <label>{typeof label === 'string' ? label : label()}</label>
      )}
      <div className="input-group mb-3">
        {prefix != null && (
          <>
            {typeof prefix === 'function' ? (
              prefix()
            ) : (
              <span className="input-group-text">{prefix}</span>
            )}
          </>
        )}
        {type === 'select'
          ? renderSelect()
          : type === 'textarea'
          ? renderTextarea()
          : type === 'checkbox'
          ? renderCheckbox()
          : type === 'file'
          ? renderFileInput()
          : renderInput()}
        {displayError && !isValid && feedback != '' && (
          <div className="invalid-feedback">{feedback}</div>
        )}
      </div>
    </div>
  )
}

export default CustomFormField
