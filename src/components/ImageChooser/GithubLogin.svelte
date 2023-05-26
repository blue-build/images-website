<script lang="ts">
  import Box from "@components/Box.svelte";
  import { customImage } from "@ts/stores";
  import type { CustomImage } from "@ts/types";
  import { onMount } from "svelte";

  let callback = "";
  let authorized = false;
  let auth = "";
  let userInfo;

  // TODO auth state is not persistent
  customImage.subscribe((c) => {
    authorized = c.auth != undefined;
  });

  onMount(() => {
    callback = `${window.location.protocol}//${window.location.host}/.netlify/functions/github-oauth`;
    const urlParams = new URLSearchParams(window.location.search);
    authorized = urlParams.has("access_token");
    if (authorized) {
      auth = urlParams.get("access_token");
      customImage.update((c) => {
        return {
          ...c,
          auth: auth,
        };
      });
      getUser();
    }
  });

  async function getUser() {
    const res = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${auth}` },
    });
    userInfo = await res.json();
  }

  // This is not sensitive and Vite only reads envvars from .env
  // so it wouldn't be possible to use this value from a Netlify envvar
  const clientId = "Iv1.1bcc0e7bd16639c1";
</script>

<div id="login" class="w-full max-w-4xl mx-auto p-16">
  <Box class="p-8 text-xl">
    {#if !authorized}
      <a href="https://github.com/login/oauth/authorize?client_id={clientId}">
        <Box border class="p-4 w-fit">Login to GitHub.</Box>
      </a>
    {:else}
      <Box border class="p-4 w-fit">
        Logged in {#if userInfo}
          as {userInfo.login}
        {/if}!
      </Box>
    {/if}
  </Box>
</div>
