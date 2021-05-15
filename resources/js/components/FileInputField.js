import React from 'react'

const FileInputField = ({labelText,classes ,placeholder,onChange}) => {
    return (
        <div className="input-group">
            <label  >{labelText}</label>
            <input type='file' className={classes} onChange={onChange} placeholder={placeholder ?? `Upload ${labelText} Here`} />
        </div>
    )
}

export default FileInputField
