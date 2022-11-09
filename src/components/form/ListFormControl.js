import React from 'react'

import CustomFormField from '@b-cedric/react-common-bootstrap/form/CustomFormField'

import SubTitle from './SubTitle'

const ListFormControl = ({
  label,
  list,
  setList,
  titleActions = [],
  fields,
  titleClass = ''
}) => {
  const remove = (index) => {
    const copy = [...list]
    copy.splice(index, 1)
    setList(copy)
  }

  const update = (index, propName, value) => {
    const copy = [...list]
    copy[index][propName] = value
    setList(copy)
  }

  const getFieldLabel = (field) => {
    const label = field.label != null ? field.label : field.propName
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  return (
    <div className="list-form-control">
      <SubTitle className={titleClass} actions={titleActions}>
        {label}
      </SubTitle>
      {list.map((item, indexItem) => (
        <div key={indexItem} className="form-line ">
          {fields.map((f, indexField) => (
            <div key={`${indexField}_${indexItem}`}>
              <CustomFormField
                label={getFieldLabel(f)}
                value={item[f.propName]}
                onChange={(e) => update(indexItem, f.propName, e.target.value)}
                type={f.type == null ? 'text' : f.type}
                isValid={!f.required || item[f.propName] != ''}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-danger delete-button"
            onClick={() => remove(indexItem)}
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  )
}

export default ListFormControl
