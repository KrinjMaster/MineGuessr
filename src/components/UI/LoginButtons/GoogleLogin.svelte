<script lang="ts">
  import { oauthLogin, setIsLoggedIn } from "../../../stores/auth/store"
  import { setUser } from "../../../stores/user"
  import Icon from '@iconify/svelte';

  const handleLogin = async (provider: string) => {
    const user = (await oauthLogin(provider)).rawUser

    setIsLoggedIn(true);
    setUser({ 
      id: user.id,
      username: user.given_name,
      email:  user.email,
      name: user.name,
      avatar: user.picture,
    })
  }
</script>

<button class="btn btn-ghost text-xl" on:click={() => handleLogin('google')}>
  <Icon icon="devicon:google" width={24} height={24}/>
  Login
</button>