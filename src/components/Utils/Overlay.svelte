<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    onclick?: (e: Event) => void;
  };

  let { children, onclick }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="overlay" {onclick}>
  {@render children()}
</div>

<style>
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 7777;
    width: 100%;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
  }
</style>
