<script lang="ts">
  import { BackendAPI } from "../../lib/api";

  import SegmentedControl from "../Control/SegmentedControl.svelte";
  import SectionCard from "../../components/Section/SectionCard.svelte";
  import SectionLoading from "../Section/SectionLoading.svelte";
  import type {
    GuestbookEntry,
    GuestbookEntryStatus,
  } from "../../lib/api/guestbook";
  import FormField from "../Form/FormField.svelte";

  let filters = $state([
    { title: "Review", count: 0, value: "review" },
    { title: "Public", count: 0, value: "public" },
    { title: "Declined", count: 0, value: "declined" },
    { title: "All", count: 0, value: "" },
  ]);
  let selectedId = $state(0);
  let isLoading = $state(false);
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

  const hrefTextWithLink = (message: GuestbookEntry) => {
    if (message.hrefText && message.href) {
      return `${message.hrefText} (${message.href})`;
    } else if (message.href) {
      return message.href;
    }

    return "";
  };

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

  async function approveMessage(id: string, replyText?: string | null) {
    if (isLoading) {
      return;
    }

    isLoading = true;
    try {
      return await BackendAPI.guestbook.approveMessage(id, replyText);
    } catch (err) {
      console.error("Failed to approve message:", err);
    } finally {
      isLoading = false;
    }
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
      <li class="message">
        <div class="message-head">
          {#if message.avatarUrl}
            <div class="message-avatar__wrapper">
              <img
                class="message-avatar"
                src={BackendAPI.guestbook.getAvatar(message.avatarUrl)}
                alt="{message.username}'s avatar"
              />
            </div>
          {/if}
          <div class="message-info">
            <h5 class="message-username text-wrap">{message.username}</h5>
            <p class="message-link text-wrap" class:is-empty={!message.href}>
              {#if !message.href}
                <no link></no>
              {:else if message.hrefText}
                {message.hrefText} (<a
                  class="message-link__url"
                  href={message.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {message.href}
                </a>)
              {:else}
                <a
                  class="message-link__url"
                  href={message.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {message.href}
                </a>
              {/if}
            </p>
          </div>
          <div class="message-status" data-status={message.status}>
            {message.status}
          </div>
        </div>
        <div class="message-content">
          <FormField
            title="Content (read-only)"
            name="content"
            value={message.content}
            disabled
            required={true}
            isTextarea={true}
          />
          <FormField
            title="Reply to message"
            name="reply"
            bind:value={message.replyText}
            isTextarea={true}
          />
          <div class="message-data">
            <p>ID: {message.id}</p>
            <p>Created: {new Date(message.createdAt).toLocaleString()}</p>
            {#if message.updatedAt !== message.createdAt}
              <p>Updated: {new Date(message.updatedAt).toLocaleString()}</p>
            {/if}
          </div>
        </div>

        <ul class="message-actions">
          {#if message.status !== "public"}
            <li class="message-action">
              <button
                class="button"
                disabled={isLoading}
                onclick={async () => {
                  const oldStatus = message.status;
                  const updatedMessage = await approveMessage(
                    message.id,
                    message.replyText,
                  );
                  if (updatedMessage) {
                    messages[idx] = updatedMessage;
                    recalcCount(oldStatus, updatedMessage.status);
                  }
                }}>Approve</button
              >
            </li>
          {/if}
          {#if message.status !== "declined"}
            <li class="message-action">
              <button
                class="message-actions__decline button button_outline"
                disabled={isLoading}
                onclick={async () => {
                  const oldStatus = message.status;
                  const updatedMessage =
                    await BackendAPI.guestbook.declineMessage(
                      message.id,
                      message.replyText,
                    );
                  if (updatedMessage) {
                    messages[idx] = updatedMessage;
                    recalcCount(oldStatus, updatedMessage.status);
                  }
                }}>Decline</button
              >
            </li>
          {/if}
        </ul>
      </li>
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
  .text-wrap {
    overflow-wrap: anywhere;
  }

  .message-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1rem;
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background: var(--surface-bg);
  }

  .message-head {
    display: flex;
    gap: 1rem;
  }

  .message-username {
    font-weight: 700;
    font-size: 1.25rem;
  }

  .message-link.is-empty {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .message-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    object-fit: cover;
    user-select: none;
    overflow: hidden;
  }

  .message-info {
    margin-top: -0.25rem;
  }

  .message-link__url {
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--primary-color);
    text-decoration: underline;
  }

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

  .message-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .message-data {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 700;
  }

  .message-actions {
    list-style: none;
    display: flex;
    gap: 0.5rem;
  }

  .message-actions__decline {
    background: color-mix(
      in srgb,
      var(--primary-color),
      transparent 80%
    ) !important;
  }

  @media screen and (max-width: 500px) {
    .message-actions {
      flex-direction: column;
    }

    .message-action .button {
      width: 100%;
    }
  }
</style>
