import * as Yup from "yup";

export const validationSchemaPostForm = Yup.object().shape({
  post: Yup.string()
    .max(20, "Must be shorter than 20 characters")
    .required("Field is required"),
});
