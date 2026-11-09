<script lang="ts">
  import { tmAlert } from "#lib/alert.ts";
  import CopyIcon from "../Icones/CopyIcon.svelte";

  const { text }: { text: string } = $props();
</script>

<button
  class="copy-button button-text"
  onclick={async () => {
    await Promise.all([
      navigator.clipboard.writeText(text),
      tmAlert("Copied to clipboard!"),
    ]);
  }}
>
  <CopyIcon />
</button>

<style>
  .copy-button {
    align-items: center;
    width: 1.25em;
    height: 1.25em;
    padding: 0.25rem;
    border-radius: 0.5rem;
    transition: background 0.25s ease;
  }

  .copy-button:hover {
    background: var(--onsurface-hover-bg);
  }
</style>
