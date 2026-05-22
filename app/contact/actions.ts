"use server"

import { createClient } from "@/lib/supabase/server"

type ContactFieldName =
  | "voornaam"
  | "naam"
  | "email"
  | "telefoonnummer"
  | "adres"
  | "land"

type ContactFormData = Record<ContactFieldName, string>

export type ContactFormState = {
  status: "idle" | "error" | "success"
  message: string
  fieldErrors?: Partial<Record<ContactFieldName, string>>
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getTextField(formData: FormData, name: ContactFieldName) {
  const value = formData.get(name)

  return typeof value === "string" ? value.trim() : ""
}

function getFieldErrors(contactData: ContactFormData) {
  const fieldErrors: ContactFormState["fieldErrors"] = {}

  for (const [name, value] of Object.entries(contactData)) {
    if (value.length === 0) {
      fieldErrors[name as ContactFieldName] = "Dit veld is verplicht."
    }
  }

  if (contactData.email && !emailPattern.test(contactData.email)) {
    fieldErrors.email = "Vul een geldig e-mailadres in."
  }

  return fieldErrors
}

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const contactData: ContactFormData = {
    voornaam: getTextField(formData, "voornaam"),
    naam: getTextField(formData, "naam"),
    email: getTextField(formData, "email"),
    telefoonnummer: getTextField(formData, "telefoonnummer"),
    adres: getTextField(formData, "adres"),
    land: getTextField(formData, "land"),
  }

  const fieldErrors = getFieldErrors(contactData)

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Controleer de gemarkeerde velden.",
      fieldErrors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("contacts").insert({
    first_name: contactData.voornaam,
    last_name: contactData.naam,
    email: contactData.email,
    phone: contactData.telefoonnummer,
    address: contactData.adres,
    country: contactData.land,
  })

  if (error) {
    console.error("Contactformulier opslaan mislukt:", error)

    return {
      status: "error",
      message: "Er ging iets mis bij het opslaan. Probeer het opnieuw.",
    }
  }

  return {
    status: "success",
    message: "Bedankt. Je gegevens zijn opgeslagen.",
  }
}
