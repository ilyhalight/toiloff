<script lang="ts">
  import { onMount } from "svelte";

  type Props = {
    condition: () => boolean;
    onIntersect: () => void | Promise<void>;
  };

  const { condition, onIntersect }: Props = $props();

  // svelte-ignore non_reactive_update
  let infinityHelper: HTMLSpanElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!(entry.isIntersecting && condition())) {
          return;
        }

        await onIntersect();
      },
      { threshold: 1.0 },
    );

    if (infinityHelper) {
      observer.observe(infinityHelper);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<span class="infinity-helper" bind:this={infinityHelper}></span>

<style>
  .infinity-helper {
    height: 1px;
    width: 1px;
    opacity: 0;
    visibility: hidden;
  }
</style>
