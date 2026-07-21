<script lang="ts">
  import type { WebringData } from "../../lib/api/webring";
  import WebringItem from "./WebringItem.svelte";

  type Props = {
    webringData: WebringData | null;
  };

  let { webringData }: Props = $props();
</script>

{#if webringData}
  <section class="webring">
    <WebringItem webringItem={webringData.prev} pos="left" />
    <div class="webring-middle">
      <span
        ><a class="link" href={webringData.info} target="_blank">Otoring</a>
        |
        <a class="link" href={webringData.random}>random</a></span
      >
    </div>
    <WebringItem webringItem={webringData.next} pos="right" />
  </section>
{/if}

<style>
  .webring {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .webring-middle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  @media screen and (max-width: 768px) {
    .webring {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
