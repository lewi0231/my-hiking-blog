"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";

const schema = yup.object({
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

const NewsletterForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Perform form submission logic here, e.g., sending data to an API
      console.log(values);
      // Reset form values after successful submission
      resetForm();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section className="sticky top-20 bg-gray-50 rounded-md shadow-md p-4">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Stay Up To Date</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                id="name"
                name="name"
                placeholder="Joe"
                type="text"
                className="border-2 border-black"
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : ""}
              Email
              <Field
                id="email"
                name="email"
                placeholder="joe@acme.com"
                type="email"
                className="border-black border-2"
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : ""}
              <Button type="submit" size="lg">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default NewsletterForm;
