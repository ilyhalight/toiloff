<script lang="ts">
  import { BackendAPI } from "../../lib/api";
  import SegmentedControl, {
    type Item,
  } from "../Control/SegmentedControl.svelte";
  import DeleteIcon from "../Icones/DeleteIcon.svelte";
  import SectionCard from "../Section/SectionCard.svelte";
  import SectionLoading from "../Section/SectionLoading.svelte";

  type ImageType = "avatars" | "images";

  let filters = $state<Item<ImageType>[]>([
    { title: "Images", value: "images" },
    { title: "Avatars", value: "avatars" },
  ]);
  let selectedId = $state(0);

  let isLoading = $state(true);
  let usedFilter = $derived(filters[selectedId].value);
  let error = $state<Error | null>(null);
  let images = $state<string[]>([]);

  $effect(() => {
    void (async () => {
      error = null;
      isLoading = true;
      try {
        await loadImages();
      } catch (err) {
        console.error("Failed to load images:", err);
        error = err as Error;
      } finally {
        isLoading = false;
      }
    })();
  });

  async function loadImages() {
    const result =
      usedFilter === "avatars"
        ? await BackendAPI.adminImages.getAvatars()
        : await BackendAPI.adminImages.getAll();
    if (!result.length) {
      throw new Error("No images found");
    }

    images = result;
    return images;
  }

  const getImage = (imageId: string) => {
    if (usedFilter === "avatars") {
      return BackendAPI.adminImages.getAvatar(imageId);
    }

    return BackendAPI.adminImages.get(imageId);
  };
</script>

<SegmentedControl
  items={filters}
  bind:selectedId
  onselect={(filter) => {
    if (usedFilter === filter.value) {
      return;
    }
  }}
/>

{#if isLoading && !images.length}
  <SectionLoading />
{:else if error}
  <SectionCard title="Error">{error.message}</SectionCard>
{:else}
  <ul class="image-list">
    {#each images as image}
      <li class="image-list__item">
        <img
          class="image-list__item-img"
          src={getImage(image)}
          alt={image}
          loading="lazy"
        />
        <button
          class="image-list__actions button button_outline"
          onclick={async () => {
            const imageId =
              usedFilter == "avatars" ? `avatars/${image}` : image;
            await BackendAPI.adminImages.delete(imageId);
            images = images.filter((img) => img !== image);
          }}
        >
          <DeleteIcon />
          Delete
        </button>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .image-list {
    list-style: none;
    columns: 4 250px;
    column-gap: 1rem;
  }

  .image-list__item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 1rem;
    padding: 1rem;
    max-width: 450px;
    height: fit-content;
    background: var(--onsurface-bg);
    break-inside: avoid;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 564px) {
    .image-list__item {
      max-width: 100%;
    }
  }

  .image-list__item-img {
    display: block;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0.5rem;
    user-select: none;
    object-fit: cover;
  }

  .image-list__actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border: none;
    background: var(--primary-surface-bg);
  }

  .image-list__actions:hover {
    background: var(--primary-color);
  }
</style>
