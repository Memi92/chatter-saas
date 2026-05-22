import Link from "next/link"
import type { ReactNode } from "react"
import { ExternalLink, Globe, Mail, MessageSquareText } from "lucide-react"

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "/signup", label: "Start free" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "mailto:sales@chatter.example", label: "Sales" },
      { href: "/login", label: "Login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Security" },
    ],
  },
]

const socialLinks = [
  { href: "https://chatter.example", label: "Website", icon: Globe },
  { href: "https://chatter.example/news", label: "News", icon: ExternalLink },
  { href: "mailto:hello@chatter.example", label: "Email", icon: Mail },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-muted/25 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MessageSquareText className="size-4" aria-hidden="true" />
            </span>
            <span>Chatter</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            A practical customer messaging workspace for SaaS teams that care
            about fast, clear replies.
          </p>
          <div className="mt-5 flex gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon

              return (
                <ButtonlessIconLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </ButtonlessIconLink>
              )
            })}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-medium">{column.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-6xl px-4 text-sm text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Chatter. All rights reserved.
      </div>
    </footer>
  )
}

function ButtonlessIconLink({
  children,
  href,
  label,
}: {
  children: ReactNode
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  )
}
