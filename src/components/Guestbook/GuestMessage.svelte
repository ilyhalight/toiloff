<script lang="ts">
  import IncognitoIcon from "../Icones/IncognitoIcon.svelte";
  import TelegramIcon from "../Icones/TelegramIcon.svelte";
  import VKIcon from "../Icones/VKIcon.svelte";
  import WebIcon from "../Icones/WebIcon.svelte";
  import XIcon from "../Icones/XIcon.svelte";
  import TwitchIcon from "../Icones/TwitchIcon.svelte";
  import GithubIcon from "../Icones/GithubIcon.svelte";
  import GuestMessageReply from "./GuestMessageReply.svelte";
  import type { GuestbookEntry } from "../../lib/api/guestbook";
  import { BackendAPI } from "../../lib/api";

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

    return !href.includes("://") ? `https://${href}` : "#";
  });
  const MessageIcon = $derived.by(() => {
    if (!href) {
      return IncognitoIcon;
    }

    if (/https?:\/\/t\.me\/.*/.exec(href)) {
      return TelegramIcon;
    } else if (/https?:\/\/x\.com\/.*/.exec(href)) {
      return XIcon;
    } else if (/https?:\/\/(m\.)?vk\.(com|ru)\/.*/.exec(href)) {
      return VKIcon;
    } else if (/https?:\/\/twitch\.tv\/.*/.exec(href)) {
      return TwitchIcon;
    } else if (/https?:\/\/github\.com\/.*/.exec(href)) {
      return GithubIcon;
    }

    return WebIcon;
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
      {#if href}
        <a
          class="guestbook-message__icon guestbook-message__icon-link"
          href={messageLink}
          aria-label={`Open ${username}'s link`}
        >
          <MessageIcon />
        </a>
      {:else}
        <span class="guestbook-message__icon">
          <MessageIcon />
        </span>
      {/if}
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
