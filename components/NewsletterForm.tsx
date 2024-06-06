"use client";

// import { Form } from "formik";
import { Button } from "./ui/button";

import { subscribe } from "@/lib/actions";
import { SubscribeSchemaType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SubscribeSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type Props = {
  className?: string;
  columnInputs?: boolean;
  label?: string;
};

const NewsletterForm = ({ className, columnInputs = true, label }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const form = useForm<SubscribeSchemaType>({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(SubscribeSchema),
  });

  const onSubmit = async (values: SubscribeSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      subscribe(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <section className={cn(className, "p-4")}>
      <div className="space-y-4">
        {label && <h2 className="text-2xl font-medium pb-2">{label}</h2>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Joe"
                        type="text"
                        disabled={isPending}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johnDoe@example.com"
                        type="email"
                        disabled={isPending}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Subscribe
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

const inputStyle = `
    flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
`;

export default NewsletterForm;
