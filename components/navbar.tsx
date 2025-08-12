import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { LogOut, User, Users, Home, Plus, Palette, Settings } from "lucide-react"
import { redirect } from "next/navigation"

async function signOut() {
  "use server"
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/auth/login")
  } catch (error) {
    console.error("Sign out error:", error)
  }
}

export default async function Navbar() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Don't show navbar if no user
    if (!user) {
      return null
    }

    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            🍹 BevRate
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/reviews/new">
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Review
              </Button>
            </Link>
            <Link href="/friends">
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Friends
              </Button>
            </Link>
            <Link href="/themes">
              <Button variant="ghost" size="sm">
                <Palette className="w-4 h-4 mr-2" />
                Themes
              </Button>
            </Link>
            <Link href="/setup">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Setup
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt={user.email} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={signOut}>
                    <button className="flex w-full items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    )
  } catch (error) {
    // Don't redirect from navbar - just show error state
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-red-600">🍹 BevRate - Connection Issue</span>
          <Link href="/config-error">
            <Button variant="outline" size="sm">
              Fix Configuration
            </Button>
          </Link>
        </div>
      </nav>
    )
  }
}
