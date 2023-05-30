<script lang="ts">
  import Box from "@components/Box.svelte";
  import { customImage } from "@ts/stores";
  import { onMount } from "svelte";

  let callback = "";
  let authorized = false;
  let userInfo: { login: string };

  customImage.subscribe((c) => {
    authorized = c.auth != undefined;
  });

  onMount(() => {
    callback = `${window.location.protocol}//${window.location.host}/.netlify/functions/github-oauth`;
    const urlParams = new URLSearchParams(window.location.search);
    let authorizing = urlParams.has("access_token");
    if (authorizing) {
      // @ts-expect-error // "access_token" not being null is checked by if
      customImage.update((c) => {
        return {
          ...c,
          auth: urlParams.get("access_token"),
        };
      });
    }
    authorized = $customImage.auth != undefined;
  });

  $: authorized && getUser();

  async function getUser() {
    const res = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${$customImage.auth}` },
    });
    userInfo = await res.json();
    customImage.update((c) => {
      return {
        ...c,
        login: userInfo.login,
      };
    });
  }

  // This is not sensitive and Vite only reads envvars from .env
  // so it wouldn't be possible to use this value from a Netlify envvar
  const clientId = "8c6add6c853b329dd78c";
</script>

<div id="login" class="w-full max-w-4xl mx-auto p-8">
  <Box class="p-8 text-xl">
    {#if !authorized}
      <a
        href="https://github.com/login/oauth/authorize?client_id={clientId}&scope=repo"
      >
        <Box border class="p-4 w-fit">Login to GitHub.</Box>
      </a>
    {:else}
      <Box border class="p-4 w-fit">
        Logged in {#if userInfo}
          as {userInfo.login}
        {/if}
      </Box>
    {/if}
  </Box>
</div>
