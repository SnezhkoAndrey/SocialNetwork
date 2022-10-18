import React from "react";
import s from "./FormsControl.module.css";

type FormControlType = (params: FormControlParamsType) => React.ReactNode;

type FormControlParamsType = {
  field: any;
  form: any;
};

export const Textarea: FormControlType = ({ field, form, ...props }) => {
  return (
    <div
      className={s.formControl + " " + (form.errors[field.name] ? s.error : "")}
    >
      <textarea {...field} {...props} />
    </div>
  );
};

export const Input: FormControlType = ({ field, form, ...props }) => {
  return (
    <div
      className={s.formControl + " " + (form.errors[field.name] ? s.error : "")}
    >
      <input {...field} {...props} />
    </div>
  );
};

export const ErrorForm = (props: any) => {
  return <div className={s.errorForm}>{props.children}</div>;
};
