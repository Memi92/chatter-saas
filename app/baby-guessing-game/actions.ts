"use server"

import { createClient } from "@/lib/supabase/server"

type BabyGuessFieldName = "geboortedatum" | "voornaam" | "gewicht" | "lengte"

type BabyGuessFormData = {
  geboortedatum: string
  voornaam: string
  gewicht: number | null
  lengte: number | null
}

export type BabyGuessFormState = {
  status: "idle" | "error" | "success"
  message: string
  fieldErrors?: Partial<Record<BabyGuessFieldName, string>>
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

function getTextField(formData: FormData, name: BabyGuessFieldName) {
  const value = formData.get(name)

  return typeof value === "string" ? value.trim() : ""
}

function getNumberField(formData: FormData, name: BabyGuessFieldName) {
  const value = getTextField(formData, name)
  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : null
}

function isValidDate(value: string) {
  if (!isoDatePattern.test(value)) {
    return false
  }

  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function getFieldErrors(babyGuessData: BabyGuessFormData) {
  const fieldErrors: BabyGuessFormState["fieldErrors"] = {}

  if (!isValidDate(babyGuessData.geboortedatum)) {
    fieldErrors.geboortedatum = "Vul een geldige geboortedatum in."
  }

  if (babyGuessData.voornaam.length === 0) {
    fieldErrors.voornaam = "Dit veld is verplicht."
  }

  if (babyGuessData.gewicht === null || babyGuessData.gewicht <= 0) {
    fieldErrors.gewicht = "Vul een gewicht groter dan 0 in."
  }

  if (babyGuessData.lengte === null || babyGuessData.lengte <= 0) {
    fieldErrors.lengte = "Vul een lengte groter dan 0 in."
  }

  return fieldErrors
}

export async function submitBabyGuess(
  _previousState: BabyGuessFormState,
  formData: FormData
): Promise<BabyGuessFormState> {
  const babyGuessData: BabyGuessFormData = {
    geboortedatum: getTextField(formData, "geboortedatum"),
    voornaam: getTextField(formData, "voornaam"),
    gewicht: getNumberField(formData, "gewicht"),
    lengte: getNumberField(formData, "lengte"),
  }

  const fieldErrors = getFieldErrors(babyGuessData)

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Controleer de gemarkeerde velden.",
      fieldErrors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("baby_guesses").insert({
    birth_date: babyGuessData.geboortedatum,
    first_name: babyGuessData.voornaam,
    weight_kg: babyGuessData.gewicht,
    length_cm: babyGuessData.lengte,
  })

  if (error) {
    console.error("Baby guessing game opslaan mislukt:", error)

    return {
      status: "error",
      message: "Er ging iets mis bij het opslaan. Probeer het opnieuw.",
    }
  }

  return {
    status: "success",
    message: "Bedankt. Je gok is opgeslagen.",
  }
}
