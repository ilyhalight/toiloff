<script lang="ts">
  import SectionCard from "../Section/SectionCard.svelte";

  export type Link =
    | {
        href: string;
        title: string;
      }
    | {
        title: string;
        onclick: (event: MouseEvent) => Promise<void> | void;
      };

  type Props = {
    title: string;
    links: Link[];
  };

  const { title, links }: Props = $props();
</script>

<SectionCard {title} compactText={false}>
  <ul class="admin-actions">
    {#each links as link}
      <li class="admin-actions__item-wrapper">
        {#if "onclick" in link}
          <button class="admin-actions__item button" onclick={link.onclick}
            >{link.title}</button
          >
        {:else}
          <a class="admin-actions__item button" href={link.href}>{link.title}</a
          >
        {/if}
      </li>
    {/each}
  </ul>
</SectionCard>

<style>
  .admin-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    list-style: none;
  }

  .admin-actions__item-wrapper {
    display: flex;
    user-select: none;
  }

  @media screen and (max-width: 500px) {
    .admin-actions {
      flex-direction: column;
    }

    .admin-actions__item {
      width: 100%;
    }
  }
</style>
