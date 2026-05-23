"use client"

import { type FormEvent, useState } from "react"
import { Sparkles } from "lucide-react"

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

export function BabyGuessingGameDialog() {
  const [status, setStatus] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("Bedankt. Je gok is ingevuld.")
    event.currentTarget.reset()
  }

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setStatus("")
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="baby-geboortedatum">Geboortedatum</Label>
              <Input
                id="baby-geboortedatum"
                name="geboortedatum"
                type="date"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baby-voornaam">Voornaam</Label>
              <Input
                id="baby-voornaam"
                name="voornaam"
                type="text"
                autoComplete="off"
                required
              />
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
              />
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
              />
            </div>
          </div>

          <div aria-live="polite" className="min-h-5">
            {status ? (
              <p className="text-sm text-muted-foreground">{status}</p>
            ) : null}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Annuleren
              </Button>
            </DialogClose>
            <Button type="submit">
              <Sparkles className="size-4" aria-hidden="true" />
              Gok bevestigen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
