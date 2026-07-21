<script lang="ts">
  import type { WebringData, WebringSiteItem } from "../../lib/api/webring";

  type Props = {
    webringItem: WebringSiteItem;
    pos: "left" | "right";
  };

  let { webringItem, pos }: Props = $props();
</script>

<div class="webring-item" data-pos={pos}>
  <a class="webring-item__link link" href={webringItem.url}>
    {#if webringItem.favicon}
      <span class="webring-item__favicon">
        <img
          class="webring-item__favicon-image"
          src={webringItem.favicon}
          alt={webringItem.name}
        />
      </span>
    {/if}
    <span class="webring-item__name text-wrap">
      {webringItem.name}
    </span>
  </a>
</div>

<style>
  .webring-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .webring-item[data-pos="left"] {
    justify-content: flex-start;
  }

  .webring-item[data-pos="right"] {
    justify-content: flex-end;
    text-align: right;
  }

  .webring-item:not(.webring-middle) {
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    .webring-item {
      justify-content: center !important;
    }
  }

  .webring-item__link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    max-width: 33vw;
  }

  .webring-item[data-pos="right"] .webring-item__link {
    flex-direction: row-reverse;
  }

  .webring-item__favicon {
    display: flex;
    min-width: 1rem;
    width: 1rem;
    height: 1rem;
  }

  .webring-item__favicon-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .webring-item__name {
    width: 100%;
  }
</style>
