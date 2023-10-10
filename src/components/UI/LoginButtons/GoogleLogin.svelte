<script lang="ts">
  import { oauthLogin, setIsLoggedIn } from "../../../stores/auth/store"
  import { setUser } from "../../../stores/user"

  const handleLogin = async (provider: string) => {
    const user = await oauthLogin(provider)

    setIsLoggedIn(true);
    setUser({ 
      id: user.id,
      username: user.username,
      email:  user.email,
      name: user.name,
      avatar: user.avatarUrl,
    })
  }
</script>

<button class="btn btn-ghost" on:click={() => handleLogin('google')}>Login</button>