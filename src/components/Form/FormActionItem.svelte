<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    onclick?: (e: Event) => void;
  };

  let { children, onclick }: Props = $props();
</script>

<button class="form__actions-item button button_outline" {onclick}>
  {@render children()}
</button>

<style>
  .form__actions-item {
    display: flex;
    padding: 0.5rem;
    outline: none;
    border: none;
    border-radius: 0.25rem;
  }

  .form__actions-item:focus {
    box-shadow: none;
  }
</style>
