import * as Yup from "yup";

export const validationSchemaMessageForm = Yup.object().shape({
  message: Yup.string()
    .max(20, "Must be shorter than 20 characters")
    .required("Field is required"),
});
