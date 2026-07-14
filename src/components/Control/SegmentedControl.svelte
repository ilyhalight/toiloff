<script lang="ts">
  export type Item<T> = {
    title: string;
    count?: number;
    value: T;
  };

  type Props = {
    items: Item<unknown>[];
    selectedId?: number;
    onselect?: <T extends unknown>(item: Item<T>) => void;
  };

  let {
    items,
    selectedId = $bindable(0),
    onselect = () => void 0,
  }: Props = $props();
</script>

<ul class="segmented-button">
  <div
    class="highlight"
    style="--index: {selectedId}; --count: {items.length};"
  ></div>
  {#each items as item, idx (idx)}
    <li
      class="segmented-button__item-wrapper"
      data-selected={idx === selectedId}
    >
      <button
        class="segmented-button__item"
        onclick={() => {
          selectedId = idx;
          onselect(item);
        }}
      >
        <span>{item.title}</span>
        {#if item.count !== undefined}
          <strong class="segmented-button__count">{item.count}</strong>
        {/if}
      </button>
    </li>
  {/each}
</ul>

<style>
  .segmented-button {
    position: relative;
    overflow: hidden;
    padding: 0.5rem;
    background: var(--surface-bg);
    border-radius: 1rem;
    list-style: none;
    display: flex;
  }

  .highlight {
    --indent-size: 0.25rem;
    --indent-size-big: 1rem;
    position: absolute;
    inset: 0;
    width: calc(100% / var(--count) - var(--indent-size));
    transform: translateX(calc(100% * var(--index)));
    margin: 0.5rem;
    background-color: var(--onsurface-bg);
    transition: transform 0.35s ease;
    z-index: 0;
    border-radius: 1rem;
  }

  .segmented-button__item-wrapper {
    flex: 1;
  }

  .segmented-button__item {
    position: relative;
    z-index: 1;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-weight: 700;
    background: transparent;
    color: var(--text-muted);
    transition: color 0.35s ease;
  }

  .segmented-button__item-wrapper[data-selected="true"]
    .segmented-button__item {
    color: var(--text-color);
  }

  @media screen and (max-width: 768px) {
    .segmented-button {
      flex-direction: column;
    }

    .highlight {
      width: calc(100% - var(--indent-size-big));
      height: calc(100% / var(--count) - var(--indent-size));
      transform: translateY(calc(100% * var(--index)));
    }
  }
</style>
