<script lang="ts">
  interface Props {
    title: string;
    description: string;
    isError?: boolean;
  }

  const { title, description, isError = false } = $props();
</script>

<li class={`system-message ${isError ? "system-message_error" : ""}`}>
  <h3 class="system-message__title text-wrap">{title}</h3>
  <p class="system-message__description text-wrap">
    {description}
  </p>
</li>

<style>
  .system-message {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    border-radius: 1.5rem;
    background: var(--surface-bg);
  }

  .system-message_error {
    background: var(--primary-surface-bg);
  }

  .system-message__title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .system-message__description {
    color: var(--text-muted);
  }
</style>
