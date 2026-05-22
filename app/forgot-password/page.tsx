import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

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
import { createClient } from "@/lib/supabase/server"

type AuthPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function ForgotPasswordPage({
  searchParams,
}: AuthPageProps) {
  const params = await searchParams
  const error = getSearchParam(params.error)
  const message = getSearchParam(params.message)

  async function resetPassword(formData: FormData) {
    "use server"

    const supabase = await createClient()
    const origin = (await headers()).get("origin") ?? "http://localhost:3000"
    const email = formData.get("email") as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
      redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
    }

    redirect(
      "/forgot-password?message=Check%20your%20email%20for%20a%20password%20reset%20link."
    )
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Enter your email and we will send a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={resetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            {message ? (
              <p className="text-sm text-muted-foreground">{message}</p>
            ) : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Remembered it?{" "}
            <Link href="/login" className="font-medium text-foreground">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
