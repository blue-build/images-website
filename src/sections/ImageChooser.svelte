<script>
  import EditionCard from "@components/EditionCard.svelte";
</script>

<!-- todo get data from content.yml -->
<div
  class="w-full max-w-7xl mx-auto h-full flex flex-row flex-wrap justify-center items-center p-16 gap-16"
>
  <EditionCard name="Silverblue" env="GNOME" />
  <EditionCard name="Kinoite" env="KDE Plasma" />
  <EditionCard name="Sericea" env="Sway" />
  <EditionCard name="Vauxite" env="XFCE" />
  <EditionCard name="Lazurite" env="LXQt" />
  <EditionCard name="Onyx" env="Budgie" />
  <EditionCard name="Mate" env="Mate" />
  <EditionCard name="Base" env="No DE" />
</div>
