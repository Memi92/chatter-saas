"use client"

import Link from "next/link"
import { useActionState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitContact, type ContactFormState } from "./actions"

type ContactFormData = {
  voornaam: string
  naam: string
  email: string
  telefoonnummer: string
  adres: string
  land: string
}

type ContactField = {
  name: keyof ContactFormData
  label: string
  type: "email" | "tel" | "text"
  autoComplete: string
}

const contactFields: ContactField[] = [
  {
    name: "voornaam",
    label: "Voornaam",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "naam",
    label: "Naam",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "E-mailadres",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "telefoonnummer",
    label: "Telefoonnummer",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "adres",
    label: "Adres",
    type: "text",
    autoComplete: "street-address",
  },
  {
    name: "land",
    label: "Land",
    type: "text",
    autoComplete: "country-name",
  },
]

const initialState: ContactFormState = {
  status: "idle",
  message: "",
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  )

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Contactformulier</CardTitle>
          <CardDescription>
            Vul je gegevens in. We nemen daarna contact met je op.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            noValidate
            action={formAction}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {contactFields.map((field) => {
                const fieldId = `contact-${field.name}`
                const fieldError = state.fieldErrors?.[field.name]

                return (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={fieldId}>{field.label}</Label>
                    <Input
                      id={fieldId}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required
                      aria-describedby={
                        fieldError ? `${fieldId}-error` : undefined
                      }
                      aria-invalid={fieldError ? true : undefined}
                    />
                    {fieldError ? (
                      <p
                        id={`${fieldId}-error`}
                        className="text-sm text-destructive"
                      >
                        {fieldError}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div aria-live="polite" className="min-h-5">
              {state.status === "error" ? (
                <p className="text-sm text-destructive">{state.message}</p>
              ) : null}
              {state.status === "success" ? (
                <p className="text-sm text-muted-foreground">
                  {state.message}
                </p>
              ) : null}
            </div>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Verzenden..." : "Formulier verzenden"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Terug naar{" "}
            <Link href="/" className="font-medium text-foreground">
              de homepagina
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
