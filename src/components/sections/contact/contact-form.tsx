"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { contactSchema, type ContactSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import type { ApiResponse } from "@/types";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-subtle transition-all duration-300 focus:border-secondary/60 focus:bg-white/[0.07] focus:outline-none";

/** Field wrapper with label, error message and consistent spacing. */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-muted block text-xs font-medium tracking-wider uppercase"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-400"
            role="alert"
          >
            <AlertCircle className="size-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");

  const [messageLength, setMessageLength] = React.useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  // Register the message field so the character counter can piggyback on
  // the same onChange handler react-hook-form provides.
  const messageField = register("message");

  const onSubmit = async (values: ContactSchema) => {
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus("success");
      toast.success("Message sent", { description: result.message });
      reset();
      setMessageLength(0);
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      setStatus("error");
      const description =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error("Could not send message", { description });
      window.setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from users and assistive tech */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your Name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            className={cn(inputClass, errors.name && "border-red-500/50")}
            {...register("name")}
          />
        </Field>

        <Field id="email" label="Email Address" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            className={cn(inputClass, errors.email && "border-red-500/50")}
            {...register("email")}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject?.message}>
        <input
          id="subject"
          type="text"
          placeholder="Project enquiry — ecommerce platform"
          aria-invalid={Boolean(errors.subject)}
          className={cn(inputClass, errors.subject && "border-red-500/50")}
          {...register("subject")}
        />
      </Field>

      <Field id="message" label="Message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell me about your project, timeline and what success looks like…"
          aria-invalid={Boolean(errors.message)}
          className={cn(
            inputClass,
            "resize-none",
            errors.message && "border-red-500/50",
          )}
          {...messageField}
          onChange={(event) => {
            setMessageLength(event.target.value.length);
            void messageField.onChange(event);
          }}
        />
        <p className="text-subtle text-right font-mono text-[11px]">
          {messageLength} / 3000
        </p>
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={submitting}
          className="group w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" />
              Sending…
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 />
              Message Sent
            </>
          ) : (
            <>
              <Send className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Send Message
            </>
          )}
        </Button>

        <p className="text-subtle text-xs leading-relaxed">
          Your details stay private and are only used to reply.
        </p>
      </div>
    </form>
  );
}
