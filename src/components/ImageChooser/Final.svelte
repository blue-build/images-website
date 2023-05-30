<script>
  import Box from "@components/Box.svelte";
  import ImageCard from "@components/ImageCard/ImageCard.svelte";
  import { customImage, imagePreferences } from "@ts/stores";
</script>

<div id="metadata" class="w-full max-w-4xl mx-auto p-8">
  <Box class="sm:p-8 p-4 flex flex-col gap-4 relative">
    <h2 class="text-xl">All done! :tada:</h2>
    <div class="flex flex-row gap-4">
      <a href={`https://github.com/${$customImage.repo}`}>
        <Box border class="w-fit p-2 px-4">Open your repo</Box>
      </a>
      <a
        href={`https://github.com/${$customImage.repo}/actions/workflows/build.yml`}
      >
        <Box border class="w-fit p-2 px-4">Start the builds</Box>
      </a>
    </div>
    <ImageCard
      image={{
        name: $customImage.name,
        creator: $customImage.login,
        featureSet: [],
        editions: [
          {
            name: $customImage.name,
            desktop: $imagePreferences.edition.desktop,
            description: $customImage.description,
            versions: ["latest"],
          },
        ],
        versions: ["latest"],
        imageUrl: `ghcr.io/${$customImage.repo}`,
        githubRepo: $customImage.repo,
      }}
      filter={{ featureSet: [], desktop: "" }}
      border
    />
  </Box>
</div>
