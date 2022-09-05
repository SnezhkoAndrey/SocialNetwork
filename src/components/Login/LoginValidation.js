import * as Yup from "yup";

export const validateLoginForm = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required field";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export const validationSchemaLoginForm = Yup.object().shape({
  password: Yup.string()
    .min(5, "Must be longer than 5 characters")
    .max(20, "Must be shorter than 20 characters")
    .required("Required field"),
});
