<script lang="ts">
  import BreadcrumbsItem from "./BreadcrumbsItem.svelte";

  export type Breadcrumb = {
    title: string;
    href: string;
  };

  type Props = {
    breadcrumbs?: Breadcrumb[];
  };

  let { breadcrumbs = [] }: Props = $props();

  const itemListElement = $derived(
    breadcrumbs.map((breadcrumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@id": breadcrumb.href,
        name: breadcrumb.title,
      },
    })),
  );
  const jsonLd = $derived(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    }),
  );
</script>

{@html `<script type="application/ld+json">${jsonLd}</script>`}

<nav class="breadcrumbs-wrapper">
  <ul class="breadcrumbs">
    {#each breadcrumbs as breadcrumb, index (breadcrumb.href)}
      {@const hasNext = index < breadcrumbs.length - 1}
      <BreadcrumbsItem
        title={breadcrumb.title}
        href={breadcrumb.href}
        {hasNext}
        isCurrent={!hasNext}
      />
    {/each}
  </ul>
</nav>

<style>
  .breadcrumbs-wrapper {
    display: flex;
    padding: 0 1.5rem;
  }

  .breadcrumbs {
    display: flex;
    gap: 0.5rem;
    list-style: none;
  }

  @media screen and (max-width: 500px) {
    .breadcrumbs-wrapper {
      padding: 0.5rem;
      font-size: 0.85rem;
    }
  }
</style>
