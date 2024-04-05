import * as yup from "yup";

// This is a generic to validate form data.
export const validateFormData = async <T extends yup.AnyObjectSchema>(
  formData: yup.InferType<T>,
  schema: T
): Promise<yup.ValidationError | undefined> => {
  try {
    const errors = await schema.validate(formData, { abortEarly: false });
    return undefined;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error;
    }
    throw error;
  }
};

export const newsletterSchema = yup.object().shape({
  name: yup
    .string()
    .required("This field is required")
    .min(1, "Too short")
    .max(30, "Your first name is getting a little long"),
  email: yup
    .string()
    .email("Not a valid email address")
    .required("This field is required"),
});

export type NewsletterSchema = yup.InferType<typeof newsletterSchema>;

export const searchSchema = yup.object().shape({
  query: yup.string(),
});

export type SearchSchema = yup.InferType<typeof searchSchema>;
