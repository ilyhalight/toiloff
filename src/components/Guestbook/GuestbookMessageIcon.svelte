<script lang="ts">
  import IncognitoIcon from "../Icones/IncognitoIcon.svelte";
  import TelegramIcon from "../Icones/TelegramIcon.svelte";
  import VKIcon from "../Icones/VKIcon.svelte";
  import WebIcon from "../Icones/WebIcon.svelte";
  import XIcon from "../Icones/XIcon.svelte";
  import TwitchIcon from "../Icones/TwitchIcon.svelte";
  import GithubIcon from "../Icones/GithubIcon.svelte";
  import type { GuestbookEntry } from "../../lib/api/guestbook";

  type Props = {
    messageLink?: GuestbookEntry["href"];
    ariaLabel?: string;
  };

  let { messageLink, ariaLabel }: Props = $props();
  let isEmptyMessageLink = $derived(messageLink === "#");
  const MessageIcon = $derived.by(() => {
    if (!messageLink || isEmptyMessageLink) {
      return IncognitoIcon;
    }

    if (/https?:\/\/t\.me\/.*/.exec(messageLink)) {
      return TelegramIcon;
    } else if (/https?:\/\/x\.com\/.*/.exec(messageLink)) {
      return XIcon;
    } else if (/https?:\/\/(m\.)?vk\.(com|ru)\/.*/.exec(messageLink)) {
      return VKIcon;
    } else if (/https?:\/\/twitch\.tv\/.*/.exec(messageLink)) {
      return TwitchIcon;
    } else if (/https?:\/\/github\.com\/.*/.exec(messageLink)) {
      return GithubIcon;
    }

    return WebIcon;
  });
</script>

{#if messageLink && !isEmptyMessageLink}
  <a
    class="guestbook-message__icon guestbook-message__icon-link"
    href={messageLink}
    aria-label={ariaLabel}
  >
    <MessageIcon />
  </a>
{:else}
  <span class="guestbook-message__icon">
    <MessageIcon />
  </span>
{/if}

<style>
  .guestbook-message__icon {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    color: var(--text-muted);
    transition: color 0.25s ease;
  }

  .guestbook-message__icon > :global(svg) {
    width: 32px;
    height: 32px;
  }

  .guestbook-message__icon-link:hover {
    color: var(--text-hover-color);
  }
</style>
