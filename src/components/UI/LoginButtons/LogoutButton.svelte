<script lang="ts">
  import { logout } from "../../../stores/auth/store"


  const handleLogout = () => {
    logout();
  }
</script>

<button class="btn btn-error btn-outline" on:click={() => handleLogout()}>Log out</button>