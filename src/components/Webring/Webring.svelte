<script lang="ts">
  import { onMount } from "svelte";

  import WebringItem from "./WebringItem.svelte";
  import type { WebringData } from "../../lib/api/webring";
  import { ExternalWebringAPI } from "../../lib/external-api/webring";
  import RandomIcon from "../Icones/RandomIcon.svelte";

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
      <span class="webring-middle__links"
        ><a
          class="webring-info link link_boxed"
          href={webringData.info}
          target="_blank">Otoring</a
        >
        <a
          class="webring-random link link_boxed"
          href={webringData.random}
          aria-label="random website"><RandomIcon /></a
        ></span
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
      flex-wrap: wrap;
    }

    .webring-middle {
      width: 100%;
    }

    .webring-middle__links {
      width: 100%;
    }

    .webring-middle__links > .webring-info {
      width: 100%;
      padding: 0.75rem 1.25rem;
    }

    .webring-random {
      font-size: 1.5rem;
      padding: 0.75rem;
    }
  }

  @media screen and (max-width: 500px) {
    .webring-middle {
      font-size: 0.875rem;
    }

    .webring-middle__links > .webring-info {
      padding: 0.5rem 1rem;
    }

    .webring-random {
      font-size: 1.25rem;
      padding: 0.5rem;
    }
  }

  @media screen and (min-width: 376px) and (max-width: 768px) {
    .webring-middle {
      order: 999;
    }
  }

  .webring-middle__links {
    display: flex;
    gap: 0.5rem;
  }

  .webring-random {
    display: flex;
    align-items: center;
  }
</style>
