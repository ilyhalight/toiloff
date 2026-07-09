<script lang="ts">
  import RingSpinner from "../Icones/RingSpinner.svelte";
</script>

<section
  class="section-loading"
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  <span class="section-loading__spinner" aria-hidden="true">
    <RingSpinner />
  </span>

  <div class="section-loading__content">
    <h2 class="section-loading__label">Loading</h2>
    <p class="section-loading__description">
      Please wait while the content is being prepared.
    </p>
  </div>
</section>

<style>
  .section-loading {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    background: var(--surface-bg);
  }

  .section-loading__spinner {
    display: flex;
    width: 2.75rem;
    height: 2.75rem;
    font-size: 2.75rem;
  }

  .section-loading__label {
    font-size: clamp(1.35rem, 3vw, 2rem);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .section-loading__description {
    margin-top: 0.35rem;
    color: var(--text-muted);
  }

  @media screen and (max-width: 500px) {
    .section-loading {
      align-items: flex-start;
    }
  }
</style>
