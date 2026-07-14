<script lang="ts">
  interface Props {
    title: string;
    required?: boolean;
  }

  let { title, required }: Props = $props();
</script>

<span class="form__label">
  {title}
  {#if !required}
    <small>optional</small>
  {/if}
</span>

<style>
  .form__label {
    color: var(--text-muted);
    font-weight: 700;
    user-select: none;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .form__label small {
    color: var(--text-muted);
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }
</style>
