import {
  Bot,
  ChartNoAxesColumnIncreasing,
  Inbox,
  LucideIcon,
  MessageSquareMore,
  ShieldCheck,
  Workflow,
} from "lucide-react"

const features: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: Inbox,
    title: "Shared inbox",
    description:
      "Route every support, sales, and success conversation into one accountable queue.",
  },
  {
    icon: Bot,
    title: "AI draft assist",
    description:
      "Create accurate replies from customer history, product docs, and prior resolutions.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    description:
      "Trigger assignments, alerts, and follow-ups without forcing teams into manual triage.",
  },
  {
    icon: MessageSquareMore,
    title: "Conversation context",
    description:
      "See plan, lifecycle stage, open issues, and recent activity beside every message.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Team reporting",
    description:
      "Track response times, backlog, handoffs, and resolution quality across every channel.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Keep customer conversations protected with session-aware access and clear audit trails.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-b bg-muted/25 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-normal">
            Everything your team needs to respond with context.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for high-volume SaaS teams that need speed, ownership, and
            clean customer handoffs.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.title}
                className="rounded-lg border bg-background p-5 shadow-sm"
              >
                <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
