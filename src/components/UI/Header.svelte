<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<div class="navbar flex items-center justify-between bg-base-100 bg-opacity-25 fixed backdrop-blur-3xl text-white px-5">
  <a class="font-extrabold text-3xl" href="/">MineGuessr</a>
  <div class="dropdown dropdown-hover">
    <label tabindex="0" class="m-1 btn btn-primary btn-outline">Theme</label>
    <ul tabindex="0" class="dropdown-content z-[1] menu menu-lg p-2 shadow bg-base-100 rounded-box w-fit gap-1.5">
      <button class="btn" data-toggle-theme="light" data-act-class="ACTIVECLASS">light</button>
      <button class="btn" data-toggle-theme="dark" data-act-class="ACTIVECLASS">dark</button>
    </ul>
  </div>
</div>