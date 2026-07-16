<script lang="ts">
  import { fade, fly } from "svelte/transition";

  let { children } = $props();
</script>

<div class="timed-message">
  <div
    class="timed-message_content"
    in:fly={{ y: -28, duration: 400, opacity: 0 }}
    out:fade={{ duration: 250 }}
  >
    {@render children()}
  </div>
</div>

<style>
  .timed-message {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 7777;
    width: 100%;
    left: 0;
    top: 108px;
    pointer-events: none;
  }

  .timed-message_content {
    display: flex;
    pointer-events: auto;
    width: fit-content;
    max-width: 500px;
    background: var(--onsurface-bg);
    border: 1px solid var(--stroke-color);
    border-radius: 1rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
  }
</style>
