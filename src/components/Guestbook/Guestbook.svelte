<script lang="ts">
  import { onMount } from "svelte";

  import { type GuestbookEntry } from "../../lib/api/guestbook";
  import GuestMessage from "./GuestMessage.svelte";
  import GuestZeroMessage from "./GuestbookZeroMessage.svelte";
  import GuestbookSkeletonMessage from "./GuestbookSkeletonMessage.svelte";
  import { BackendAPI } from "../../lib/api";
  import { getLocalMessages } from "../../lib/local-storage/guestbook";

  interface Props {
    messages: GuestbookEntry[];
    nextCursor: string | null;
  }

  let { messages, nextCursor }: Props = $props();
  let isLoading = $state(false);
  let firstMessageId = $derived(
    messages.find((message) => message.status === "public")?.id ?? "",
  );

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

  export function loadLocalMessages() {
    if (!messages.length) {
      return;
    }

    const localMessages = getLocalMessages();
    if (!localMessages) {
      return;
    }

    // if there are new messages (firstMessageId > message.id), it means that the message has been declined
    const filteredMessages = localMessages.filter(
      (message) => message.id > firstMessageId,
    );
    if (filteredMessages.length !== localMessages.length) {
      localStorage.setItem(
        "guestbook-messages",
        JSON.stringify(filteredMessages),
      );
    }

    messages = [
      ...filteredMessages,
      ...messages.filter((message) => message.status === "public"),
    ];
  }

  function handleMessageCreated() {
    loadLocalMessages();
  }

  function listenMessageCreated(node: HTMLElement) {
    node.addEventListener("message-created", handleMessageCreated);

    return {
      destroy() {
        node.removeEventListener("message-created", handleMessageCreated);
      },
    };
  }

  onMount(() => {
    loadLocalMessages();
  });
</script>

<div class="guestbook" use:listenMessageCreated>
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
    class:button_loading={isLoading}
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
