<script lang="ts">
  import CopyButton from "./CopyButton.svelte";

  const { content }: { content: string } = $props();
</script>

<div class="text-output">
  <p class="text-output__content text-wrap">{content}</p>
  <CopyButton text={content} />
</div>

<style>
  .text-output {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 2.5rem 0.75rem 1.25rem;
    border-radius: 1rem;
    font-size: 0.85rem;
    background: var(--surface-bg);
  }

  .text-output :global(.copy-button) {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }

  .text-output__content {
    -webkit-user-select: all;
    user-select: all;
  }
</style>
