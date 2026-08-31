<script lang="ts">
  import { tmAlert } from "../../lib/alert";
  import { BackendAPI } from "../../lib/api";
  import { showImageOverlay, showModal } from "../../lib/modal";
  import SegmentedControl, {
    type Item,
  } from "../Control/SegmentedControl.svelte";
  import DeleteIcon from "../Icones/DeleteIcon.svelte";
  import ModalConfirmContent from "../Modal/ModalConfirmContent.svelte";
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

  const handleDelete = async (image: string) => {
    const imageId = usedFilter == "avatars" ? `avatars/${image}` : image;
    await BackendAPI.adminImages.delete(imageId);
    images = images.filter((img) => img !== image);
    await tmAlert("Image deleted successfully");
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
      {@const imageSrc = getImage(image)}
      <li class="image-list__item-wrapper">
        <button
          class="image-list__item"
          onclick={() =>
            showImageOverlay(imageSrc, image, () =>
              showModal(deleteModalContent, "Delete image"),
            )}
        >
          <img
            class="image-list__item-image"
            src={imageSrc}
            alt={image}
            loading="lazy"
          />
        </button>
        {#snippet deleteModalContent()}
          <p class="text-danger">This action can't be undone!</p>
          <ModalConfirmContent
            buttonText="Delete"
            requiredText="DELETE"
            onClick={async () => await handleDelete(image)}
          />
        {/snippet}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .image-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .image-list__item {
    display: flex;
    gap: 1rem;
    border-radius: 1rem;
    padding: 1rem;
    background: var(--onsurface-bg);
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: zoom-in;
    transition: background-color 0.25s ease;
  }

  .image-list__item:hover {
    background: var(--onsurface-hover-bg);
  }

  .image-list__item-image {
    display: block;
    overflow: hidden;
    max-width: 100%;
    max-height: 300px;

    border-radius: 0.5rem;
    user-select: none;
    object-fit: cover;
    transition: transform 0.25s ease;
  }

  .image-list__item:hover .image-list__item-image {
    transform: scale(1.035);
  }

  /* .image-list__actions {
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
  } */
</style>
