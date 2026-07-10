<script lang="ts">
  import GuestMessageReply from "./GuestMessageReply.svelte";
  import type { GuestbookEntry } from "../../lib/api/guestbook";
  import { BackendAPI } from "../../lib/api";
  import GuestbookMessageIcon from "./GuestbookMessageIcon.svelte";

  interface Props {
    message: GuestbookEntry;
    hidden?: boolean;
  }

  const dateFormatter = Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const { hidden = false, message }: Props = $props();
  const { username, content, href, hrefText, replyText, createdAt, avatarUrl } =
    $derived(message);
  const messageDate = $derived(dateFormatter.format(new Date(createdAt)));
  const messageAvatarUrl = $derived(BackendAPI.guestbook.getAvatar(avatarUrl));
  const hrefContent = $derived(hrefText ?? href);
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
</script>

<li class="guestbook-message" {hidden}>
  <div class="guestbook-message__head">
    <div class="guestbook-message__head-item">
      {#if messageAvatarUrl}
        <div class="guestbook-message__avatar" aria-hidden="true">
          <img
            class="guestbook-message__avatar-image"
            alt={`${username}'s avatar`}
            src={messageAvatarUrl}
          />
        </div>
      {/if}

      <div class="guestbook-message__info">
        <h5 class="guestbook-message__info-title text-truncate">{username}</h5>
        {#if hrefContent}
          <a
            class="guestbook-message__info-link"
            href={messageLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hrefContent}
          </a>
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
  <div class="guestbook-message__date">
    {messageDate}
  </div>
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

  .guestbook-message__info:not(:has(.guestbook-message__info-link))
    .guestbook-message__info-title {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 500px) {
    .guestbook-message__info-title {
      font-size: 1rem;
    }

    .guestbook-message__info:not(:has(.guestbook-message__info-link))
      .guestbook-message__info-title {
      font-size: 1.25rem;
    }
  }

  .guestbook-message__icon {
    width: 32px;
    height: 32px;
  }

  :global(.guestbook-message__icon > svg) {
    width: 32px;
    height: 32px;
  }

  .guestbook-message__info-link,
  .guestbook-message__icon {
    color: var(--text-muted);
    transition: color 0.25s ease;
  }

  .guestbook-message__info-link:hover,
  .guestbook-message__icon-link:hover,
  .guestbook-message__head:has(.guestbook-message__info-link:hover)
    .guestbook-message__icon-link,
  .guestbook-message__head:has(.guestbook-message__icon-link:hover)
    .guestbook-message__info-link {
    color: var(--text-hover-color);
  }

  .guestbook-message__date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
  }
</style>
