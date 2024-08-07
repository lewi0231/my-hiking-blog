"use client";

import { inter } from "@/app/utils/fonts";
import { SearchSchema, searchSchema } from "@/app/utils/validation-helper";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import InputIconOverlay from "./ui/input-icon-overlay";

type Props = {
  className: string;
  position: number;
};

const SearchModal = ({ position }: Pick<Props, "position">) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    values: SearchSchema,
    { resetForm }: FormikHelpers<SearchSchema>
  ) => {
    try {
      const response = await fetch("/posts/search", {
        method: "GET",
        body: JSON.stringify({ ...values }),
      });

      const data = await response.json();

      // Reset form values after successful submission
      resetForm();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogTrigger asChild>
          <button className="btn">
            <InputIconOverlay
              Icon={MagnifyingGlassIcon}
              iconClass={
                "opacity-50 text-black"
                // position > 0
                //   ? "opacity-100 text-white"
                //   : "opacity-25 text-black"
              }
              overlayIcon={position === 0}
            />
          </button>
        </DialogTrigger>
        <DialogContent className="p-0 h-16">
          <Formik
            initialValues={{
              query: "",
            }}
            validationSchema={searchSchema}
            onSubmit={() => console.log("complete")}
          >
            <Form action="/posts/search" method="GET">
              <Field
                type="text"
                name="query"
                className={cn(
                  " py-2 px-6 text-xl h-full w-full",
                  inter.className
                )}
                placeholder="Search..."
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    const query = (e.target as HTMLInputElement).value;

                    router.push(
                      `/posts/search?query=${encodeURIComponent(query)}`
                    );

                    setModalIsOpen(false);
                  }
                }}
              />
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchModal;
