import Link from "next/link"
import { revalidatePath } from "next/cache"
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

export default async function LoginPage({ searchParams }: AuthPageProps) {
  const params = await searchParams
  const error = getSearchParam(params.error)
  const message = getSearchParam(params.message)

  async function login(formData: FormData) {
    "use server"

    const supabase = await createClient()

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath("/", "layout")
    redirect("/")
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Forgot?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            {message ? (
              <p className="text-sm text-muted-foreground">{message}</p>
            ) : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/signup" className="font-medium text-foreground">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
