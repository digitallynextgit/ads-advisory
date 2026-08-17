"use server";

import { interestOptions } from "@/lib/content";
import type { EnquiryField, EnquiryState } from "@/lib/enquiry";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const read = (key: EnquiryField) => String(formData.get(key) ?? "").trim();

  const values: Record<EnquiryField, string> = {
    name: read("name"),
    organisation: read("organisation"),
    designation: read("designation"),
    phone: read("phone"),
    email: read("email"),
    interest: read("interest"),
    message: read("message"),
  };

  const errors: EnquiryState["errors"] = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (values.organisation.length < 2)
    errors.organisation = "Please enter your organisation.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && !PHONE_RE.test(values.phone))
    errors.phone = "Please enter a valid phone number.";
  if (!interestOptions.includes(values.interest as (typeof interestOptions)[number]))
    errors.interest = "Please select an area of interest.";
  if (values.message.length < 10)
    errors.message = "Please tell us a little more, at least a sentence.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
      values,
    };
  }

  // TODO(delivery): forward the enquiry to the firm's inbox or CRM.
  // Everything below this line is the only place that needs to change,
  // e.g. Resend / SendGrid / a webhook. The validation above already ran.
  console.info("[enquiry]", {
    ...values,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message:
      "Thank you. Your enquiry has reached us. We will come back to you shortly.",
    errors: {},
    values: {},
  };
}
