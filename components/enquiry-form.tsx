"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitEnquiry } from "@/app/actions";
import { interestOptions } from "@/lib/content";
import {
  initialEnquiryState,
  type EnquiryField,
  type EnquiryState,
} from "@/lib/enquiry";
import { ArrowIcon } from "./ui";

export default function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="animate-page-in flex min-h-[26rem] flex-col items-start justify-center border border-line bg-ink-card p-10"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-saffron/40">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="m4 10.5 4 4 8-9"
              stroke="var(--color-saffron)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h3 className="mt-7 text-2xl text-fg">Enquiry received.</h3>
        <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          autoComplete="name"
          required
          state={state}
        />
        <Field
          name="organisation"
          label="Organisation"
          autoComplete="organization"
          required
          state={state}
        />
        <Field
          name="designation"
          label="Designation"
          autoComplete="organization-title"
          state={state}
        />
        <Field
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          state={state}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          className="sm:col-span-2"
          state={state}
        />

        {/* Area of interest */}
        <div className="sm:col-span-2">
          <Label htmlFor="interest" required>
            Area of Interest
          </Label>
          <select
            id="interest"
            name="interest"
            required
            defaultValue={state.values.interest ?? ""}
            aria-invalid={Boolean(state.errors.interest)}
            aria-describedby={state.errors.interest ? "interest-error" : undefined}
            className="field mt-1 cursor-pointer"
          >
            <option value="" disabled>
              Select one
            </option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="interest-error" message={state.errors.interest} />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <Label htmlFor="message" required>
            Message
          </Label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            defaultValue={state.values.message ?? ""}
            placeholder="What are you hoping to get out of the engagement?"
            aria-invalid={Boolean(state.errors.message)}
            aria-describedby={state.errors.message ? "message-error" : undefined}
            className="field mt-1 resize-y"
          />
          <FieldError id="message-error" message={state.errors.message} />
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-vermilion">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <SubmitButton />
        <p className="text-xs leading-relaxed text-dim">
          We treat every enquiry as confidential.
        </p>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Sending" : "Send enquiry"}
      {pending ? (
        <span
          aria-hidden
          className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent"
        />
      ) : (
        <ArrowIcon />
      )}
    </button>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[0.68rem] font-semibold tracking-[0.2em] text-dim uppercase"
    >
      {children}
      {required && (
        <span className="ml-1 text-vermilion" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-vermilion">
      {message}
    </p>
  );
}

function Field({
  name,
  label,
  state,
  type = "text",
  required,
  autoComplete,
  className = "",
}: {
  name: EnquiryField;
  label: string;
  state: EnquiryState;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  const error = state.errors[name];

  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={state.values[name] ?? ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="field mt-1"
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}
