import React from 'react'

const SubTitle = ({ children, actions = [], className = '' }) => {
  return (
    <div className={`sub-title ${className}`}>
      {children}
      <div className="subtitle-actions">
        {actions.map((a, k) => (
          <button
            type="button"
            key={k}
            className="btn btn-primary"
            onClick={a.onClick}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SubTitle
