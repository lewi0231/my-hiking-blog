"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { CalendarHeart } from "lucide-react";
import { Button } from "./ui/button";

import {
  newsletterSchema,
  NewsletterSchema,
} from "@/app/utils/validation-helper";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

type Props = {
  className?: string;
  columnInputs?: boolean;
  label?: string;
};

const NewsletterForm = ({ className, columnInputs = true, label }: Props) => {
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
    <section className={cn(" p-4", className)}>
      <div className="space-y-4">
        {label && <h2 className="text-2xl font-semibold pb-2">{label}</h2>}
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={newsletterSchema}
        >
          {({ errors, touched }) => (
            <Form
              className={cn(
                "flex gap-4",
                columnInputs ? "flex-col" : "flex-row"
              )}
            >
              <div className="w-full space-y-4">
                <Field
                  id="name"
                  name="name"
                  placeholder="First name"
                  type="text"
                  className={cn(inputStyle, "bg-white py-6")}
                />
                {errors.name && touched.name ? (
                  <div className="pl-2">{errors.name}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full space-y-4">
                <Field
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  type="email"
                  className={cn(inputStyle, "bg-white py-6")}
                />
                {errors.email && touched.email ? (
                  <div className="pl-2">{errors.email}</div>
                ) : (
                  ""
                )}
              </div>

              <Button type="submit" size="lg" className="py-6">
                Subscribe
              </Button>
            </Form>
          )}
        </Formik>
        <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
          <DialogContent className="flex items-center gap-2 py-4">
            <CalendarHeart />
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
