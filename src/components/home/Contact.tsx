import { sendMessage } from "@/app/axios/features/message";
import AlertSuccess from "@/components/alerts/AlertSuccess";
import { AlertError } from "@/components/alerts/error";
import ReactHookFormTextInput from "@/components/input/ReactHookFormTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ContactSchema } from "@/lib/schema/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactHookFormTextArea from "../input/ReactHookFormTextArea";

export default function Contact() {
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      from: "",
      phoneNumber: "",
      email: "",
      message: "",
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const onSubmit = async (values: z.infer<typeof ContactSchema>) => {
    setError("");
    setSuccess("");

    const response = await sendMessage(values);
    if (response.error) return setError(response.error);
    setSuccess(response.message);
    form.reset();
  };
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <h3 className="max-xl:text-4xl text-5xl text-navy dark:text-light font-extrabold">
        Contact me!
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-md:w-full max-md:px-4 max-xl:w-2/3 w-1/3">
          <ReactHookFormTextInput
            form={form}
            name="from"
            label="Your name"
            className="h-10"
          />
          <ReactHookFormTextInput
            form={form}
            name="phoneNumber"
            label="Your phone number"
            placeholder="+123456-7890"
          />
          <ReactHookFormTextInput form={form} name="email" label="Your email" />
          <ReactHookFormTextArea
            form={form}
            name="message"
            label="Message"
            className="h-40"
          />

          <AlertError message={error} />
          <AlertSuccess message={success} />
          <Button className="w-full h-12 font-bold text-base">
            Send message
          </Button>
        </form>
      </Form>
    </section>
  );
}
