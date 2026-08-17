/**
 * Shared enquiry types and the initial form state.
 *
 * These live outside `app/actions.ts` on purpose: a `"use server"` module may
 * only export async functions, so a plain object exported from there is
 * stripped at build time and arrives as `undefined` on the client.
 */

export type EnquiryField =
  | "name"
  | "organisation"
  | "designation"
  | "phone"
  | "email"
  | "interest"
  | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<EnquiryField, string>>;
  values: Partial<Record<EnquiryField, string>>;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
