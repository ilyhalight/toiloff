<script lang="ts">
  import { BackendAPI } from "../../lib/api";

  import type {
    GuestbookEntry,
    GuestbookEntryStatus,
  } from "../../lib/api/guestbook";
  import FormField from "../Form/FormField.svelte";
  import GuestbookMessageStatus from "./GuestbookMessageStatus.svelte";
  import GuestMessageDate from "./GuestMessageDate.svelte";

  type Props = {
    message: GuestbookEntry;
    onApprove: (
      updatedMessage: GuestbookEntry,
      oldStatus: GuestbookEntryStatus,
    ) => void;
    onDecline: (
      updatedMessage: GuestbookEntry,
      oldStatus: GuestbookEntryStatus,
    ) => void;
  };

  let {
    message,
    onApprove = () => void 0,
    onDecline = () => void 0,
  }: Props = $props();

  let isLoading = $state(false);
  async function loadingWrapper<T>(factory: () => Promise<T>) {
    if (isLoading) {
      return;
    }

    isLoading = true;
    try {
      return await factory();
    } catch (err) {
      console.error("Failed to perform action:", err);
    } finally {
      isLoading = false;
    }
  }
</script>

<li class="message">
  <div class="message-head">
    {#if message.avatarUrl}
      <div class="message-avatar__wrapper">
        <img
          class="message-avatar"
          loading="lazy"
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
    <GuestbookMessageStatus status={message.status} />
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
      <p class="message-data__item">ID: <span>{message.id}</span></p>
      <p class="message-data__item">
        Created: <GuestMessageDate dateTime={message.createdAt} />
      </p>
      {#if message.updatedAt !== message.createdAt}
        <p class="message-data__item">
          Updated: <GuestMessageDate dateTime={message.updatedAt} />
        </p>
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
            const updatedMessage = await loadingWrapper(() =>
              BackendAPI.guestbook.approveMessage(
                message.id,
                message.replyText,
              ),
            );
            if (updatedMessage) {
              onApprove(updatedMessage, oldStatus);
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
            const updatedMessage = await loadingWrapper(() =>
              BackendAPI.guestbook.declineMessage(
                message.id,
                message.replyText,
              ),
            );
            if (updatedMessage) {
              onDecline(updatedMessage, oldStatus);
            }
          }}>Decline</button
        >
      </li>
    {/if}
  </ul>
</li>

<style>
  .text-wrap {
    overflow-wrap: anywhere;
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
    display: block;
    overflow: hidden;
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    object-fit: cover;
    user-select: none;
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

  .message-data__item {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
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
