<script lang="ts">
  import { BackendAPI } from "../../lib/api";

  import SegmentedControl from "../Control/SegmentedControl.svelte";
  import SectionCard from "../../components/Section/SectionCard.svelte";
  import SectionLoading from "../Section/SectionLoading.svelte";
  import type {
    GuestbookEntry,
    GuestbookEntryStatus,
  } from "../../lib/api/guestbook";
  import GuestbookMessageEdit from "../Guestbook/GuestbookMessageEdit.svelte";

  let filters = $state([
    { title: "Review", count: 0, value: "review" },
    { title: "Public", count: 0, value: "public" },
    { title: "Declined", count: 0, value: "declined" },
    { title: "All", count: 0, value: "" },
  ]);
  let selectedId = $state(0);
  let isLoading = $state(true);
  let nextCursor: string | null = $state(null);
  let error = $state<Error | null>(null);
  let messages = $state<GuestbookEntry[]>([]);
  let usedFilter = $derived(filters[selectedId].value);

  $effect(() => {
    const status = usedFilter;

    void (async () => {
      error = null;
      isLoading = true;
      try {
        await loadMessages(status);
      } catch (err) {
        console.error("Failed to load messages:", err);
        error = err as Error;
      } finally {
        isLoading = false;
      }
    })();
  });

  async function loadMessages(status?: string, cursor?: string | null) {
    const result = await BackendAPI.guestbook.loadAdmin(status, cursor);
    filters = filters.map((filter) => {
      if (filter.value === "") {
        return { ...filter, count: result.stats.all };
      }

      return {
        ...filter,
        count: result.stats[filter.value as keyof typeof result.stats] || 0,
      };
    });

    if (!result.items.length) {
      throw new Error("No messages found");
    }

    nextCursor = result.nextCursor;
    if (cursor) {
      messages = [...messages, ...result.items];
    } else {
      messages = result.items;
    }

    return messages;
  }

  function recalcCount(
    oldStatus: GuestbookEntryStatus,
    newStatus: GuestbookEntryStatus,
  ) {
    filters = filters.map((filter) => {
      if (filter.value === oldStatus) {
        return { ...filter, count: filter.count - 1 };
      } else if (filter.value === newStatus) {
        return { ...filter, count: filter.count + 1 };
      }

      return filter;
    });
  }

  function onMessageEdit(
    idx: number,
    updatedMessage: GuestbookEntry,
    oldStatus: GuestbookEntryStatus,
  ) {
    messages[idx] = updatedMessage;
    recalcCount(oldStatus, updatedMessage.status);
  }
</script>

<SegmentedControl
  items={filters}
  bind:selectedId
  onselect={(filter) => {
    if (usedFilter === filter.value) {
      return;
    }
  }}
/>

{#if isLoading && !messages.length}
  <SectionLoading />
{:else if error}
  <SectionCard title="Error">{error.message}</SectionCard>
{:else}
  <ul class="message-list">
    {#each messages as message, idx (message.id)}
      <GuestbookMessageEdit
        {message}
        onApprove={(updatedMessage, oldStatus) => {
          onMessageEdit(idx, updatedMessage, oldStatus);
        }}
        onDecline={(updatedMessage, oldStatus) => {
          onMessageEdit(idx, updatedMessage, oldStatus);
        }}
      />
    {/each}
  </ul>
  {#if nextCursor}
    <button
      class="button"
      disabled={isLoading}
      onclick={async () => await loadMessages(usedFilter, nextCursor)}
      >Load more</button
    >
  {/if}
{/if}

<style>
  .message-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1rem;
  }
</style>
