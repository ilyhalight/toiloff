<script lang="ts">
  type Props = {
    title: string;
    compactText?: boolean;
    children: any;
  };
  const { title, children, compactText = true }: Props = $props();
</script>

<div class="section-card">
  <h2 class="section-card__title">{title}</h2>
  <div class="section-card__content" class:is-compact={compactText}>
    {@render children()}
  </div>
</div>

<style>
  .section-card {
    padding: 1.25rem;
    border-radius: 1.5rem;
    background: var(--surface-bg);
  }

  .section-card__title {
    margin-top: 0.25rem;
    font-size: clamp(1.9rem, 5vw, 3.5rem);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .section-card__content {
    margin-top: 0.75rem;
    color: var(--text-muted);
  }

  .section-card__content.is-compact {
    max-width: 38rem;
  }
</style>
