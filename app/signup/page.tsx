import Link from "next/link"
import { revalidatePath } from "next/cache"
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

export default async function SignupPage({ searchParams }: AuthPageProps) {
  const params = await searchParams
  const error = getSearchParam(params.error)
  const message = getSearchParam(params.message)

  async function signup(formData: FormData) {
    "use server"

    const supabase = await createClient()
    const origin = (await headers()).get("origin") ?? "http://localhost:3000"

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
      redirect(`/signup?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath("/", "layout")
    redirect(
      "/login?message=Check%20your%20email%20to%20confirm%20your%20account."
    )
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Start with your email and a secure password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {message ? (
              <p className="text-sm text-muted-foreground">{message}</p>
            ) : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
