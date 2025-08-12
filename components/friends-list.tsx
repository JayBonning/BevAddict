import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default async function FriendsList() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: friendships } = await supabase
    .from('friendships')
    .select(`
      *,
      friend:friend_id (
        id,
        email,
        full_name
      ),
      requester:user_id (
        id,
        email,
        full_name
      )
    `)
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)

  if (!friendships || friendships.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No friends yet. Start by searching for users!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {friendships.map((friendship) => {
        const friend = friendship.user_id === user.id ? friendship.friend : friendship.requester
        const isRequester = friendship.user_id === user.id
        
        return (
          <Card key={friendship.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {friend.full_name?.charAt(0) || friend.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{friend.full_name || friend.email}</p>
                  <p className="text-sm text-muted-foreground">{friend.email}</p>
                </div>
              </div>
              <Badge variant={friendship.status === 'accepted' ? 'default' : 'secondary'}>
                {friendship.status === 'accepted' ? 'Friends' : 
                 isRequester ? 'Pending' : 'Requested'}
              </Badge>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
