import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "For founders validating support workflows.",
    features: ["1 shared inbox", "2 seats", "Basic conversation history"],
    cta: "Start free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing SaaS teams handling live customer volume.",
    features: [
      "Unlimited inboxes",
      "10 seats included",
      "AI draft assist",
      "Workflow automation",
    ],
    cta: "Start Pro",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For larger teams with advanced security needs.",
    features: ["SSO readiness", "Priority support", "Custom onboarding"],
    cta: "Contact sales",
    href: "mailto:sales@chatter.example",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-b bg-background py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-normal">
            Pricing that scales with your support team.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start small, add automation when volume grows, and keep a direct
            path to enterprise controls.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={
                tier.highlighted
                  ? "relative rounded-lg border-2 border-primary bg-card p-6 shadow-lg shadow-foreground/10"
                  : "rounded-lg border bg-card p-6 shadow-sm"
              }
            >
              {tier.highlighted ? (
                <span className="absolute right-4 top-4 rounded-lg bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Recommended
                </span>
              ) : null}
              <h3 className="text-lg font-medium">{tier.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-semibold">{tier.price}</span>
                {tier.price.startsWith("$") ? (
                  <span className="pb-1 text-sm text-muted-foreground">
                    /seat
                  </span>
                ) : null}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check
                      className="mt-0.5 size-4 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-8 w-full"
                variant={tier.highlighted ? "default" : "outline"}
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
