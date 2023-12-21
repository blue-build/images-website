<script lang="ts">
  import _sodium from "libsodium-wrappers";
  import Box from "@components/Box.svelte";
  import { customImage } from "@ts/stores";
  let publicKey = "";
  let privateKey = "";
  let log = "";

  async function setupSigning() {
    log = "";
    // this is just an artifical delay to make it feel like the "submit" button does something
    await new Promise((r) => setTimeout(r, 50));
    try {
      if (!publicKey.startsWith("-----BEGIN PUBLIC KEY-----")) {
        log +=
          'Invalid public key, must start with "-----BEGIN PUBLIC KEY-----". \n';
        throw new Error();
      }
      if (
        !privateKey.startsWith("-----BEGIN ENCRYPTED SIGSTORE PRIVATE KEY-----") &&
        !privateKey.startsWith("-----BEGIN ENCRYPTED COSIGN PRIVATE KEY-----")
      ) {
        log +=
          'Invalid private key, must start with "-----BEGIN ENCRYPTED SIGSTORE PRIVATE KEY-----" or "-----BEGIN ENCRYPTED COSIGN PRIVATE KEY-----". \n';
        throw new Error();
      }

      await _sodium.ready;
      const sodium = _sodium;

      const repoPubKeyRes = await fetch(
        `https://api.github.com/repos/${$customImage.repo}/actions/secrets/public-key`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${$customImage.auth}` },
        }
      );
      const repoPubKeyJson = await repoPubKeyRes.json();
      if (!repoPubKeyRes.ok) {
        log += "Error getting repository public key: \n";
        log += JSON.stringify(repoPubKeyJson);
        log += "\n";
        throw new Error();
      } else {
        log += "Repository public key got successfully! \n";
      }
      const repoPubKey = repoPubKeyJson.key;

      const binRepoPubKey = sodium.from_base64(
        repoPubKey,
        sodium.base64_variants.ORIGINAL
      );
      const binPrivateKey = sodium.from_string(privateKey);
      const encBytes = sodium.crypto_box_seal(binPrivateKey, binRepoPubKey);
      const encPrivateKey = sodium.to_base64(
        encBytes,
        sodium.base64_variants.ORIGINAL
      );
      log += "Private signing key encrypted successfully! \n";

      const privateKeyRes = await fetch(
        `https://api.github.com/repos/${$customImage.repo}/actions/secrets/SIGNING_SECRET`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${$customImage.auth}` },
          body: JSON.stringify({
            encrypted_value: encPrivateKey,
            key_id: repoPubKeyJson.key_id,
          }),
        }
      );
      if (!privateKeyRes.ok) {
        log += "Error setting SIGNING_SECRET. \n";
        throw new Error();
      } else {
        log += "Set SIGNING_SECRET successfully! \n";
      }

      const publicKeyRes = await fetch(
        `https://api.github.com/repos/${$customImage.repo}/contents/cosign.pub`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${$customImage.auth}` },
        }
      );
      const publicKeyJson = await publicKeyRes.json();
      if (!publicKeyRes.ok) {
        log += "Error getting old cosign.pub: \n";
        log += JSON.stringify(publicKeyJson);
        log += "\n";
        throw new Error();
      } else {
        log += "Old cosign.pub got successfully! \n";
      }

      const publicKeyUpdateRes = await fetch(
        `https://api.github.com/repos/${$customImage.repo}/contents/cosign.pub`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${$customImage.auth}` },
          body: JSON.stringify({
            message: "chore(automatic): new cosign keys",
            content: btoa(publicKey.trimEnd()+'\n'),
            sha: publicKeyJson.sha,
          }),
        }
      );
      if (!publicKeyUpdateRes.ok) {
        log += "Error updating cosign.pub. \n";
        throw new Error();
      } else {
        log += "cosign.pub updated successfully! \n";
      }

      $customImage.signingDone = true;
      log += "**** \n";
      log += "Container signing for your repo has been setup successfully! \n";
      log += `https://github.com/${$customImage.repo}`;
    } catch {
      log += "!!!! \n";
      log +=
        "Sorry, but repo creation cannot continue due to a fatal failure. \
Your new repo might have been left in a partially functional state, you can try again. \
You can report this to the sites issue tracker: https://github.com/ublue-os/images-website/issues. \
Remember to include logs, both from the console (enable XHR) and here.";
    }
  }
</script>

<div id="metadata" class="w-full max-w-4xl mx-auto p-8">
  <Box class="p-8 flex flex-col gap-4 relative">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex (element is interactive with hover and focus) -->
    <div class="absolute right-4 top-4 group" tabindex="0">
      <div class="cursor-pointer text-xs underline">Can I trust you?</div>
      <div
        class="hidden group-hover:block group-focus:block sm:absolute text-sm lg:-top-8 lg:-left-32 sm:-top-16 sm:-left-24 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Box class="p-2 lg:w-[32rem] sm:w-[24rem] w-[16rem]" border>
          uBlue and this website is an open source project and so is this
          website. You can view the source code of this website in <a
            href="https://github.com/ublue-os/images-website"
            class="underline">the Github repo.</a
          > Furthermore, this web app runs entirely within your browser and nothing
          is sent to a server other than Github's.
        </Box>
      </div>
    </div>
    <div class="text-xl">Set up container signing.</div>
    <div class="flex flex-row gap-2 items-center flex-wrap">
      First you need to run the command below:
      <pre
        class="bg-fg-secondary text-bg-page dark:bg-bg-page dark:text-fg-secondary p-2 whitespace-pre-wrap">podman run -it ghcr.io/ublue-os/cosign-generate-keypair</pre>
      Then copy the keys to the fields below and press submit.
      <div class="p-2 flex flex-col gap-2 w-full">
        <label for="public">Public key:</label>
        <Box class="w-full h-fit" border>
          <textarea
            bind:value={publicKey}
            id="public"
            class="w-full h-16 bg-transparent text-fg-primary placeholder:text-fg-secondary p-1 px-2"
            placeholder="-----BEGIN PUBLIC KEY-----"
          />
        </Box>
        <label for="private">Private key:</label>
        <Box class="w-full" border>
          <textarea
            bind:value={privateKey}
            id="private"
            class="w-full h-32 bg-transparent text-fg-primary placeholder:text-fg-secondary p-1 px-2"
            placeholder="-----BEGIN ENCRYPTED SIGSTORE PRIVATE KEY-----"
          />
        </Box>
        <button on:click={setupSigning}>
          <Box border class="w-fit p-2 px-4 mt-4">Submit</Box>
        </button>
      </div>
      {#if log}
        <pre
          class="whitespace-pre-wrap text-sm bg-fg-secondary text-bg-page dark:text-bg-secondary dark:bg-bg-page p-4">{log}</pre>
      {/if}
    </div>
  </Box>
</div>
