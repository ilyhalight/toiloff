<script lang="ts">
  interface Props {
    eyebrow: string;
    title: string;
    description: string;
  }

  let { eyebrow, title, description }: Props = $props();
</script>

<div class="form__head">
  <p class="form__eyebrow">{eyebrow}</p>
  <h2 class="form__title">{title}</h2>
  <p class="form__description">{description}</p>
</div>

<style>
  .form__head {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form__eyebrow {
    color: var(--text-muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .form__eyebrow {
    color: var(--primary-color);
    font-size: 0.85rem;
  }

  .form__title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    line-height: 1;
  }

  .form__description {
    color: var(--text-muted);
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }
</style>
