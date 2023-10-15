<script lang="ts">
  import { useAuth } from "../../../stores/auth/store"
  import { useUser } from "../../../stores/user";
  import type { User } from "../../../types/Auth"
  import GoogleLogin from "../LoginButtons/GoogleLogin.svelte"
  import LogoutButton from "../LoginButtons/LogoutButton.svelte"

  let data: {
    isLoggedIn: boolean;
    user: User | null;
  } = {
    isLoggedIn: false,
    user: null,
  };

  $: if ($useAuth?.isLoggedIn) {
    data.isLoggedIn = true;
  }

  $: if ($useUser) {
    data.user = $useUser;
  }
</script>

{#if data.isLoggedIn}
  <div class="dropdown dropdown-end">
    <label tabindex="-1" for="dropdown-profile">
      <img src={data.user?.avatar} alt='avatar' class="w-12 rounded-lg border"/>
    </label>
    <ul id="dropdown-profile" tabindex="-1" class="dropdown-content bg-transparent ring ring-secondary z-[1] menu p-2 shadow rounded-box w-36 mt-2.5 gap-2.5">
      <p class="font-bold text-xl">{$useUser?.username}</p>
      <LogoutButton />
    </ul>
  </div>
{:else}
  <GoogleLogin />
{/if}