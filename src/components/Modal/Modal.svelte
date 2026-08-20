<script lang="ts">
  import type { Snippet } from "svelte";
  import CloseIcon from "../Icones/CloseIcon.svelte";

  type Props = {
    children: Snippet;
    isOpen?: boolean;
    title?: string;
  };

  // svelte-ignore non_reactive_update
  let modalEl: HTMLElement;
  let { children, title, isOpen = $bindable(true) }: Props = $props();

  const close = () => {
    isOpen = false;
  };
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="modal-wrapper"
    onclick={(event) => {
      const path = event.composedPath();
      if (path.includes(modalEl)) {
        return;
      }

      close();
    }}
  >
    <div class="modal" bind:this={modalEl}>
      <div class="modal-header">
        {#if title}
          <h3 class="modal-title text-wrap">{title}</h3>
        {/if}
        <button
          class="modal-close button-text"
          aria-label="Close modal"
          onclick={close}
        >
          <CloseIcon />
        </button>
      </div>
      <div class="modal-content">
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 7777;
    width: 100%;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    pointer-events: auto;
    width: fit-content;
    max-width: 500px;
    min-width: 250px;
    background: var(--onsurface-bg);
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    margin: 0 0.5rem;
  }

  .modal-header {
    font-weight: 600;
    display: flex;
    gap: 0.5rem;
    min-width: inherit;
  }

  .modal-title {
    max-width: calc(100% - 1.25rem);
  }

  .modal-close {
    position: absolute;
    padding: 0.5rem;
    border-radius: 0.75rem;
    top: 0.25rem;
    right: 0.25rem;
  }

  .modal-close:hover {
    background: var(--onsurface-hover-bg);
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .modal-content :global(.textfield) {
    background: var(--surface-bg);
  }
</style>
