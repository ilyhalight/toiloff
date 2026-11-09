<script lang="ts">
  import ArrowIcon from "../Icones/ArrowIcon.svelte";

  import type { DonateItem } from "#lib/donate.ts";
  import { showModal } from "#lib/modal.ts";

  type Props = {
    donate: DonateItem;
    idx: number;
  };

  let { donate, idx }: Props = $props();
</script>

<li class="donate-item__wrapper" data-index={idx + 1}>
  {#snippet modalContent()}
    <donate.modal {...donate.modalProps} />
  {/snippet}
  <a
    class="donate-item"
    href={donate.href}
    onclick={donate.modal
      ? (e) => {
          if (!donate.modal) {
            return;
          }

          e.preventDefault();
          showModal(modalContent, donate.modalTitle ?? donate.title);
        }
      : undefined}
  >
    <div class="donate-item__head">
      <span class="donate-item__logo" data-platform={donate.platform}>
        <donate.icon />
      </span>
      <h1 class="donate-item__title">{donate.title}</h1>
      {#if !donate.modal}
        <span class="donate-item__icon-open" data-open="external">
          <ArrowIcon />
        </span>
      {/if}
    </div>
    <div class="donate-item__body">
      <p>{donate.description}</p>
      {#if donate.bgIcon}
        <span class="donate-item__icon-bg">
          <donate.bgIcon />
        </span>
      {/if}
    </div>
  </a>
</li>

<style>
  .donate-item__wrapper {
    display: flex;
  }

  .donate-item__wrapper[data-index="1"] {
    grid-row: 1 / 3;
    overflow: hidden;
  }

  .donate-item__wrapper[data-index="1"] .donate-item {
    gap: 2rem;
    justify-content: space-between;
  }

  @media (max-width: 567px) {
    .donate-item__wrapper {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 568px) and (max-width: 1079px) {
    .donate-item__wrapper[data-index="1"] {
      grid-column: 1 / -1;
    }

    .donate-item__wrapper[data-index="2"] {
      grid-column: 1 / 3;
    }
  }

  @media (min-width: 1080px) {
    .donate-item__wrapper[data-index="1"] {
      grid-column: 1 / 3;
    }

    .donate-item__wrapper[data-index="2"] {
      grid-column: 3 / 5;
    }
  }

  .donate-item {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0.75rem;
    background: var(--surface-bg);
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    width: 100%;
    transition: background 0.25s ease;
  }

  .donate-item:hover {
    background: var(--onsurface-hover-bg);
  }

  .donate-item__head {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    height: 48px;
  }

  .donate-item__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    height: 48px;
    width: 48px;
    border-radius: 0.75rem;
    background: var(--onsurface-bg);
  }

  .donate-item__logo[data-platform="boosty"] {
    color: #ff6600;
  }

  .donate-item__title {
    font-size: 2rem;
    font-weight: 600;
    flex: 1;
  }

  .donate-item__icon-open {
    font-size: 2rem;
    color: var(--text-muted);
  }

  .donate-item__icon-open[data-open="external"] {
    transform: rotate(45deg);
    will-change: transform;
    transition: transform 0.25s ease;
  }

  .donate-item:hover .donate-item__icon-open[data-open="external"] {
    transform: rotate(90deg);
  }

  .donate-item__body p {
    color: var(--text-muted);
    max-width: 300px;
  }

  .donate-item__icon-bg :global(svg) {
    position: absolute;
    color: var(--text-muted);
    opacity: 0.05;
    bottom: -5%;
    width: 50%;
    height: 110%;
    right: 0;
  }
</style>
