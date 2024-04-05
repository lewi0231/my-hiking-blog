"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button } from "./ui/button";

import {
  newsletterSchema,
  NewsletterSchema,
} from "@/app/utils/validation-helper";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

const NewsletterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (
    values: NewsletterSchema,
    { resetForm }: FormikHelpers<NewsletterSchema>
  ) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ ...values }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setModalIsOpen(true);

        // Reset form values after successful submission
        resetForm();
      }
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
          validationSchema={newsletterSchema}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <Field
                id="name"
                name="name"
                placeholder="First name"
                type="text"
                className={inputStyle}
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : ""}
              <Field
                id="email"
                name="email"
                placeholder="email@example.com"
                type="email"
                className={inputStyle}
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : ""}
              <Button type="submit" size="lg">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
          <DialogContent>
            Congratulations, you&apos;ve successfully signed up.
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

const inputStyle = `
    flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
`;

export default NewsletterForm;
