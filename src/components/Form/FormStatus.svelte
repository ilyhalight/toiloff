<script lang="ts">
  export type Status = {
    isHidden: boolean;
    type: "error" | "success";
    text: string;
  };

  type Props = {
    status: Status;
  };

  let { status }: Props = $props();
</script>

<p
  class="guestbook-form__status"
  data-status={status.type}
  role="status"
  aria-live="polite"
  hidden={status.isHidden}
>
  {status.text}
</p>

<style>
  .guestbook-form__status {
    padding: 0.9rem 1rem;
    border-radius: 1rem;
    background: color-mix(in srgb, var(--success-color), transparent 84%);
    color: var(--text-color);
  }

  .guestbook-form__status[data-status="error"] {
    background: var(--primary-surface-bg);
  }
</style>
