"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"

import {
  submitBabyGuess,
  type BabyGuessFormState,
} from "@/app/baby-guessing-game/actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState: BabyGuessFormState = {
  status: "idle",
  message: "",
}

export function BabyGuessingGameDialog() {
  const [formKey, setFormKey] = useState(0)

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setFormKey((currentKey) => currentKey + 1)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" className="h-11 px-4" type="button">
          <Sparkles className="size-4" aria-hidden="true" />
          Baby guessing game
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Baby guessing game</DialogTitle>
          <DialogDescription>
            Vul je voorspelling in voor de komst van de baby.
          </DialogDescription>
        </DialogHeader>

        <BabyGuessingGameForm key={formKey} />
      </DialogContent>
    </Dialog>
  )
}

function BabyGuessingGameForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, pending] = useActionState(
    submitBabyGuess,
    initialState
  )

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="baby-geboortedatum">Geboortedatum</Label>
          <Input
            id="baby-geboortedatum"
            name="geboortedatum"
            type="date"
            required
            aria-describedby={
              state.fieldErrors?.geboortedatum
                ? "baby-geboortedatum-error"
                : undefined
            }
            aria-invalid={state.fieldErrors?.geboortedatum ? true : undefined}
          />
          {state.fieldErrors?.geboortedatum ? (
            <p
              id="baby-geboortedatum-error"
              className="text-sm text-destructive"
            >
              {state.fieldErrors.geboortedatum}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="baby-voornaam">Voornaam</Label>
          <Input
            id="baby-voornaam"
            name="voornaam"
            type="text"
            autoComplete="off"
            required
            aria-describedby={
              state.fieldErrors?.voornaam ? "baby-voornaam-error" : undefined
            }
            aria-invalid={state.fieldErrors?.voornaam ? true : undefined}
          />
          {state.fieldErrors?.voornaam ? (
            <p id="baby-voornaam-error" className="text-sm text-destructive">
              {state.fieldErrors.voornaam}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="baby-gewicht">Gewicht (kg)</Label>
          <Input
            id="baby-gewicht"
            name="gewicht"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            required
            aria-describedby={
              state.fieldErrors?.gewicht ? "baby-gewicht-error" : undefined
            }
            aria-invalid={state.fieldErrors?.gewicht ? true : undefined}
          />
          {state.fieldErrors?.gewicht ? (
            <p id="baby-gewicht-error" className="text-sm text-destructive">
              {state.fieldErrors.gewicht}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="baby-lengte">Lengte (cm)</Label>
          <Input
            id="baby-lengte"
            name="lengte"
            type="number"
            min="0"
            step="0.1"
            inputMode="decimal"
            required
            aria-describedby={
              state.fieldErrors?.lengte ? "baby-lengte-error" : undefined
            }
            aria-invalid={state.fieldErrors?.lengte ? true : undefined}
          />
          {state.fieldErrors?.lengte ? (
            <p id="baby-lengte-error" className="text-sm text-destructive">
              {state.fieldErrors.lengte}
            </p>
          ) : null}
        </div>
      </div>

      <div aria-live="polite" className="min-h-5">
        {state.status === "error" ? (
          <p className="text-sm text-destructive">{state.message}</p>
        ) : null}
        {state.status === "success" ? (
          <p className="text-sm text-muted-foreground">{state.message}</p>
        ) : null}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={pending}>
            Annuleren
          </Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          <Sparkles className="size-4" aria-hidden="true" />
          {pending ? "Opslaan..." : "Gok bevestigen"}
        </Button>
      </DialogFooter>
    </form>
  )
}
