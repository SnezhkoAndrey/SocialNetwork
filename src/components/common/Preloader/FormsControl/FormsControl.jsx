import React from 'react';
import s from './FormsControl.module.css';

export const Textarea = ({field, form, ...props}) => {
    return (
        <div className={s.formControl + " " + (form.errors[field.name] ? s.error : "")}>
            <textarea {...field} {...props} />
        </div>
    )
}

export const Input = ({field, form, ...props}) => {
    return (
        <div className={s.formControl + " " + (form.errors[field.name] ? s.error : "")}>
            <input {...field} {...props} />
        </div>
    )
}

export const ErrorForm = (props) => {
    return (
        <div className={s.errorForm}>
            {props.children}
        </div>
    )
}

