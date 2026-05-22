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

export default async function ResetPasswordPage({
  searchParams,
}: AuthPageProps) {
  const params = await searchParams
  const error = getSearchParam(params.error)

  async function updatePassword(formData: FormData) {
    "use server"

    const supabase = await createClient()
    const password = formData.get("password") as string

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath("/", "layout")
    redirect("/")
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Choose new password</CardTitle>
          <CardDescription>
            Enter a new password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updatePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full">
              Update password
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
