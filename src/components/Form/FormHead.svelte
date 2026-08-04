<script lang="ts">
  interface Props {
    title: string;
    description: string;
  }

  let { title, description }: Props = $props();
</script>

<div class="form__head">
  <h2 class="form__title">{title}</h2>
  <p class="form__description">{description}</p>
</div>

<style>
  .form__head {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
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
