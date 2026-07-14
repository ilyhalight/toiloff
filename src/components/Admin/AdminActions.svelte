<script lang="ts">
  import SectionCard from "../Section/SectionCard.svelte";

  export type Link = {
    href: string;
    title: string;
  };

  type Props = {
    title: string;
    links: Link[];
  };

  const { title, links }: Props = $props();
</script>

<SectionCard {title}>
  <ul class="admin-actions">
    {#each links as link}
      <li class="admin-actions__item-wrapper">
        <a class="admin-actions__item button" href={link.href}>{link.title}</a>
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
