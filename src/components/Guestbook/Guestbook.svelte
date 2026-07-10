<script lang="ts">
  import type { GuestbookEntry } from "../../lib/api/guestbook";
  import GuestMessage from "./GuestMessage.svelte";
  import GuestZeroMessage from "./GuestbookZeroMessage.svelte";
  import GuestbookSkeletonMessage from "./GuestbookSkeletonMessage.svelte";
  import { BackendAPI } from "../../lib/api";

  interface Props {
    messages: GuestbookEntry[];
    nextCursor: string | null;
  }

  let { messages, nextCursor }: Props = $props();
  let isLoading = $state(false);

  async function loadMessages() {
    isLoading = true;
    try {
      const result = await BackendAPI.guestbook.load(nextCursor);
      if (!result.items.length) {
        throw new Error("No messages found");
      }

      nextCursor = result.nextCursor;
      messages = [...messages, ...result.items];

      return messages;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="guestbook">
  <ul class="guestbook-list">
    {#each messages as message}
      <GuestMessage {message} />
    {:else}
      <GuestZeroMessage />
    {/each}
  </ul>

  <GuestbookSkeletonMessage hidden={!isLoading} />

  <button
    class="button button_outline guestbook__load-more"
    hidden={!nextCursor}
    disabled={isLoading}
    onclick={async () => {
      await loadMessages();
    }}>Load more messages</button
  >
</div>

<style>
  .guestbook {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .guestbook-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1rem;
  }

  .guestbook__load-more {
    width: 100%;
  }

  .guestbook__load-more:disabled {
    cursor: wait;
    opacity: 0.7;
  }
</style>
