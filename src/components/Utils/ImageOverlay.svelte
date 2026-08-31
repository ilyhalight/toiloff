<script lang="ts">
  import DeleteIcon from "../Icones/DeleteIcon.svelte";
  import Overlay from "./Overlay.svelte";

  type Props = {
    isOpen?: boolean;
    src: string;
    title?: string;
    onDelete?: () => void;
  };

  // svelte-ignore non_reactive_update
  let utilsEl: HTMLElement;
  // svelte-ignore non_reactive_update
  let contentEl: HTMLElement;
  let { isOpen = $bindable(true), src, title, onDelete }: Props = $props();

  const close = () => {
    isOpen = false;
  };
</script>

{#if isOpen}
  <Overlay
    onclick={(event) => {
      const path = event.composedPath();
      if (path.includes(utilsEl) || path.includes(contentEl)) {
        return;
      }

      close();
    }}
  >
    <div class="image-wrapper">
      <div class="image-content" bind:this={contentEl}>
        <img class="image-content__image" {src} alt={title} />
      </div>
      <div class="image-utils__wrapper" bind:this={utilsEl}>
        <div class="image-utils">
          {#if title}
            <p class="image-utils__title text-wrap">{title}</p>
          {/if}
          {#if onDelete}
            <button
              class="button-text image-delete"
              onclick={(e) => {
                e.preventDefault();
                onDelete?.();
              }}
              aria-label="Delete"><DeleteIcon /></button
            >
          {/if}
        </div>
      </div>
    </div>
  </Overlay>
{/if}

<style>
  :global(.overlay:has(> .image-wrapper)) {
    cursor: zoom-out;
  }

  .image-wrapper {
    cursor: initial;
  }

  .image-content {
    user-select: none;
    margin: 0 0.75rem;
  }

  .image-content__image {
    border-radius: 0.75rem;
    max-width: 100%;
    max-height: 80vh;
  }

  .image-utils__wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-utils {
    max-width: var(--container-max-width);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    margin: 0.75rem;
    gap: 0.75rem;
    border-radius: 0.75rem;
    background: var(--onsurface-bg);
  }

  @media screen and (max-width: 500px) {
    .image-utils {
      flex-direction: column;
    }
  }

  .image-utils__title {
    font-size: 0.825rem;
  }

  .image-utils .button-text {
    padding: 0.25rem;
    user-select: none;
  }

  .image-delete {
    color: color-mix(in srgb, var(--primary-color), transparent 35%);
    transition: color 0.25s ease;
  }

  .image-delete:hover {
    color: var(--primary-color);
  }
</style>
