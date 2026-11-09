<script lang="ts">
  import { renderSVG } from "uqr";
  import TextOutput from "../Control/TextOutput.svelte";

  /**
   * base64 encoded
   */
  const { content }: { content: string } = $props();

  const decrypted = $derived(atob(content));
  const svg = $derived(
    renderSVG(decrypted, {
      ecc: "H",
      border: 2,
    }),
  );
</script>

<div class="modal-content">
  <span class="qrcode-wrapper">
    {@html svg}
  </span>
  <TextOutput content={decrypted} />
</div>

<style>
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .qrcode-wrapper {
    max-width: 100%;
    min-height: 200px;
    max-height: 256px;
  }

  .qrcode-wrapper :global(svg) {
    width: 100%;
    height: 100%;
  }

  .qrcode-wrapper :global(svg > rect) {
    rx: 1rem;
    ry: 1rem;
  }

  .modal-content :global(.text-output) {
    max-width: 350px;
  }
</style>
