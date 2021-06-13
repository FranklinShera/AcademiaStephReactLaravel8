import React from 'react'

const FileInputField = ({labelText,classes ,placeholder,onChange , errors}) => {
    return (
        <div className="input-group">
            <label  >{labelText}</label>
            <div className="field-errors">{errors}</div>
            <input type='file' className={classes} onChange={onChange} placeholder={placeholder ?? `Upload ${labelText} Here`} />
        </div>
    )
}

export default FileInputField
