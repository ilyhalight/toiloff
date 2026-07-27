<script lang="ts">
  import ChevronRightIcon from "../Icones/ChevronRightIcon.svelte";

  type Props = {
    title: string;
    href: string;
    hasNext?: boolean;
    isCurrent?: boolean;
  };

  let { title, href, hasNext = false, isCurrent = false }: Props = $props();
</script>

<li class="breadcrumbs-item" aria-current={isCurrent}>
  <a class="breadcrumbs-item__link text-truncate" {href}>{title}</a>
  {#if hasNext}
    <span class="breadcrumbs-item__devider"><ChevronRightIcon /></span>
  {/if}
</li>

<style>
  .breadcrumbs-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  .breadcrumbs-item__link {
    max-width: 300px;
  }

  .breadcrumbs-item[aria-current="true"] {
    color: var(--text-color);
    pointer-events: none;
  }

  .breadcrumbs-item:not([aria-current="true"]) > .breadcrumbs-item__link:hover {
    color: var(--primary-color);
  }

  .breadcrumbs-item__devider {
    height: 1rem;
    line-height: 2px;
  }
</style>
