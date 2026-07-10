<script lang="ts">
  import { dateFormatter } from "../../lib/utils";

  type Props = {
    dateTime: string | number;
  };

  let { dateTime }: Props = $props();

  const messageDate = $derived(dateFormatter.format(new Date(dateTime)));
</script>

<span class="guestbook-message__date">
  {messageDate}
</span>

<style>
  .guestbook-message__date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
  }
</style>
