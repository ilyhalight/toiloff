<script lang="ts">
  import GuestMessageReply from "./GuestMessageReply.svelte";
  import type { GuestbookEntry } from "../../lib/api/guestbook";
  import { BackendAPI } from "../../lib/api";
  import GuestbookMessageIcon from "./GuestbookMessageIcon.svelte";
  import GuestMessageDate from "./GuestMessageDate.svelte";

  interface Props {
    message: GuestbookEntry;
    hidden?: boolean;
  }

  const { hidden = false, message }: Props = $props();
  const { username, content, href, subText, replyText, createdAt, avatarUrl } =
    $derived(message);
  const messageAvatarUrl = $derived(BackendAPI.guestbook.getAvatar(avatarUrl));
  const subContent = $derived(subText ?? href);
  const messageLink = $derived.by(() => {
    if (!href) {
      return "#";
    }

    if (/https?:\/\/.*/.exec(href)) {
      return href;
    }

    // Stop suspicious links if protocol isn't http(s)
    return href.includes("://") ? "#" : `https://${href}`;
  });
  const isAllowedMessageLink = $derived(messageLink !== "#");
</script>

<li class="guestbook-message" {hidden} data-status={message.status}>
  {#if message.status === "review"}
    <div class="guestbook-message__status">
      <p class="guestbook-message__status-detail">Waiting review...</p>
    </div>
  {/if}
  <div class="guestbook-message__head">
    <div class="guestbook-message__head-item">
      {#if messageAvatarUrl}
        <div class="guestbook-message__avatar" aria-hidden="true">
          <img
            class="guestbook-message__avatar-image"
            loading="lazy"
            alt={`${username}'s avatar`}
            src={messageAvatarUrl}
          />
        </div>
      {/if}

      <div class="guestbook-message__info">
        <h5 class="guestbook-message__info-title text-truncate">{username}</h5>
        {#if subContent && isAllowedMessageLink}
          <a
            class="guestbook-message__info-subtext guestbook-message__info-link"
            href={messageLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {subContent}
          </a>
        {:else if subContent}
          <span class="guestbook-message__info-subtext">{subContent}</span>
        {/if}
      </div>
    </div>
    <div class="guestbook-message__head-item">
      <GuestbookMessageIcon
        {messageLink}
        ariaLabel={`Open ${username}'s link`}
      />
    </div>
  </div>
  <div class="guestbook-message__content text-wrap">
    {content}
    {#if replyText}
      <GuestMessageReply content={replyText} />
    {/if}
  </div>
  <GuestMessageDate dateTime={createdAt} />
</li>

<style>
  .guestbook-message {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    background: var(--surface-bg);
    border-radius: 1rem;
  }

  .guestbook-message[hidden] {
    display: none;
  }

  .guestbook-message[data-status="review"] {
    opacity: 0.5;
  }

  .guestbook-message__status-detail {
    color: var(--text-muted);
  }

  .guestbook-message__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .guestbook-message__head-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 32px;
    overflow: hidden;
  }

  .guestbook-message__head-item:first-of-type {
    width: 100%;
  }

  .guestbook-message__avatar-image {
    display: block;
    overflow: hidden;
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    object-fit: cover;
    user-select: none;
  }

  .guestbook-message__info {
    max-width: calc(100% - 64px);
  }

  .guestbook-message__info-title {
    font-size: 1.25rem;
  }

  .guestbook-message__info:not(:has(.guestbook-message__info-subtext))
    .guestbook-message__info-title {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 500px) {
    .guestbook-message__info-title {
      font-size: 1rem;
    }

    .guestbook-message__info:not(:has(.guestbook-message__info-subtext))
      .guestbook-message__info-title {
      font-size: 1.25rem;
    }
  }

  .guestbook-message__info-subtext {
    color: var(--text-muted);
  }

  .guestbook-message__info-link {
    transition: color 0.25s ease;
  }

  .guestbook-message__info-link:hover,
  .guestbook-message__head:has(:global(.guestbook-message__info-link:hover))
    :global(.guestbook-message__icon-link),
  .guestbook-message__head:has(:global(.guestbook-message__icon-link:hover))
    .guestbook-message__info-link {
    color: var(--text-hover-color);
  }
</style>
