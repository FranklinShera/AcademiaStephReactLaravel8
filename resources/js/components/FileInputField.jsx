import React from 'react'

const FileInputField = ({labelText, name ,classes ,placeholder,onChange , errors}) => {
    return (
        <div className="input-group">
            <label  >{labelText}</label>
            <div className="field-errors">{errors}</div>
            <input type='file' name={name} className={classes} onChange={onChange} placeholder={placeholder ?? `Upload ${labelText} Here`} />
        </div>
    )
}

export default FileInputField
