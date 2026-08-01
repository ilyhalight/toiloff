<script lang="ts">
  import { onMount } from "svelte";

  import WebringItem from "./WebringItem.svelte";
  import type { WebringData } from "../../lib/api/webring";
  import { ExternalWebringAPI } from "../../lib/external-api/webring";

  type Props = {
    webringData: WebringData | null;
  };

  let { webringData }: Props = $props();

  async function updateWebringData() {
    const data = await ExternalWebringAPI.getData();
    if (!data) {
      console.error("Failed to update webring data");
      return;
    }

    webringData = data;
  }

  onMount(() => {
    void updateWebringData();
  });
</script>

<section class="webring">
  {#if webringData}
    <WebringItem webringItem={webringData.prev} pos="left" />
    <div class="webring-middle">
      <span
        ><a class="link" href={webringData.info} target="_blank">Otoring</a>
        |
        <a class="link" href={webringData.random}>random</a></span
      >
    </div>
    <WebringItem webringItem={webringData.next} pos="right" />
  {:else}
    <div class="webring-middle webring-is_down">
      <span>Webring is down (μ_μ)</span>
    </div>
  {/if}
</section>

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

  .webring-middle.webring-is_down {
    color: var(--text-muted);
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .webring {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
