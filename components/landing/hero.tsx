import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <Image
        src="/images/hero-mother-baby.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-[62%_center]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-lg border bg-background/70 px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="size-4 text-emerald-600" aria-hidden="true" />
            Customer messaging for focused teams
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-normal text-foreground text-balance sm:text-5xl lg:text-6xl">
            Hallo Gaëlle, wanneer komt de baby
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
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 bg-background/70 px-4 backdrop-blur hover:bg-background/90"
            >
              <Link href="#pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
