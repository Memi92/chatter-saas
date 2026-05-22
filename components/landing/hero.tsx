import Link from "next/link"
import { ArrowRight, MessageCircle, Sparkles, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="overflow-hidden border-b bg-background">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4 text-emerald-600" aria-hidden="true" />
            Customer messaging for focused teams
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Hallo Gaëlle, wanneer komt de baby?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Chatter brings shared inboxes, workflow automation, and customer
            context into one fast workspace for growing SaaS teams.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-4">
              <Link href="/signup">
                Start free
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-4">
              <Link href="#pricing">View pricing</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-4 top-8 hidden rounded-lg border bg-background px-3 py-2 text-sm font-medium shadow-sm sm:flex">
            <Zap className="mr-2 size-4 text-amber-500" aria-hidden="true" />
            92% faster replies
          </div>
          <div className="rounded-xl border bg-card p-3 shadow-2xl shadow-foreground/10">
            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Team inbox</p>
                  <p className="text-xs text-muted-foreground">
                    12 conversations open
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {["AN", "ML", "RS"].map((name) => (
                    <span
                      key={name}
                      className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-background text-xs font-medium"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  ["Acme", "Can we upgrade before launch?", "2m"],
                  ["Northstar", "Billing question on annual plan", "7m"],
                  ["Orbit", "Webhook retry status", "18m"],
                ].map(([team, message, time]) => (
                  <div
                    key={team}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border bg-background p-3"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <MessageCircle className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{team}</span>
                      <span className="block truncate text-sm text-muted-foreground">
                        {message}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
