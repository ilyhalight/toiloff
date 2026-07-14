<script lang="ts">
  import type { GuestbookEntryStatus } from "../../lib/api/guestbook";

  type Props = {
    status: GuestbookEntryStatus;
  };

  let { status }: Props = $props();
</script>

<div class="message-status" data-status={status}>
  {status}
</div>

<style>
  .message-status {
    height: fit-content;
    margin-left: auto;
    padding: 0.45rem 0.75rem;
    border-radius: 1rem;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    user-select: none;
    background: var(--onsurface-bg);
    color: var(--text-muted);
  }

  .message-status[data-status="public"] {
    background: color-mix(in srgb, var(--success-color), transparent 84%);
    color: var(--success-color);
  }

  .message-status[data-status="declined"] {
    background: color-mix(in srgb, var(--primary-color), transparent 84%);
    color: var(--primary-color);
  }

  .message-status[data-status="review"] {
    background: color-mix(in srgb, var(--warning-color), transparent 84%);
    color: var(--warning-color);
  }
</style>
