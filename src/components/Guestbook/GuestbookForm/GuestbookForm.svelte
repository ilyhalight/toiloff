<script lang="ts">
  import type { WidgetMethods } from "altcha/types";

  import GuestbookFormField from "./GuestbookFormField.svelte";
  import GuestbookFormHead from "./GuestbookFormHead.svelte";
  import Captcha from "../../Captcha/Captcha.svelte";
  import { BackendAPI } from "../../../lib/api";

  type GuestbookFormStatus = {
    isHidden: boolean;
    type: "error" | "success";
    text: string;
  };

  const DEFAULT_BUTTON_TEXT = "Send for moderation";
  // svelte-ignore non_reactive_update
  let captchaWidget: (HTMLElement & WidgetMethods) | null = null;
  let form: HTMLFormElement | null = null;

  let username = $state("");
  let content = $state("");
  let link: string | undefined = $state(undefined);
  let linkLabel: string | undefined = $state(undefined);
  let avatarUrl: string | undefined = $state(undefined);

  let isDisabledButton = $state(false);
  let buttonText = $state(DEFAULT_BUTTON_TEXT);
  let status: GuestbookFormStatus = $state({
    isHidden: true,
    type: "success",
    text: "",
  });

  async function submitForm(captchaPayload?: string) {
    try {
      await BackendAPI.createGuestMessage(
        {
          username,
          content,
          href: link,
          hrefText: linkLabel,
          avatarUrl,
        },
        captchaPayload,
      );
      status = {
        isHidden: false,
        type: "success",
        text: "Thanks! Your message is awaiting moderation.",
      };
      form?.reset();
    } catch (err) {
      status = {
        isHidden: false,
        type: "error",
        text: (err as Error).message ?? `Failed to send message`,
      };
    } finally {
      buttonText = DEFAULT_BUTTON_TEXT;
      isDisabledButton = false;
    }
  }

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!form) {
      return;
    }

    if (!captchaWidget) {
      console.warn("Captcha widget isn't initialized. Looks strange...");
    }

    status.isHidden = true;
    isDisabledButton = true;
    buttonText = "Validating...";
    if (!form.checkValidity()) {
      buttonText = DEFAULT_BUTTON_TEXT;
      isDisabledButton = false;
      return form.reportValidity();
    }

    buttonText = "Calculating...";
    if (!captchaWidget) {
      return await submitForm();
    }

    const result = await captchaWidget.verify();
    buttonText = "One moment...";
    const currentState = captchaWidget.getState();
    if (currentState !== "verified" || !result?.payload) {
      status = {
        isHidden: false,
        type: "error",
        text: "Captcha verification failed. Please try again.",
      };
      buttonText = DEFAULT_BUTTON_TEXT;
      isDisabledButton = false;
      return;
    }

    buttonText = "Sending...";
    return await submitForm(result.payload);
  }
</script>

<form class="guestbook-form" bind:this={form}>
  <GuestbookFormHead />
  <GuestbookFormField
    title="Name"
    name="username"
    maxLength={32}
    placeholder="Anonymous"
    required
    bind:value={username}
  ></GuestbookFormField>

  <GuestbookFormField
    title="Message"
    name="content"
    maxLength={4096}
    placeholder="Say something..."
    isTextarea={true}
    required
    bind:value={content}
  ></GuestbookFormField>

  <GuestbookFormField
    title="Link"
    name="href"
    type="url"
    inputmode="url"
    maxLength={512}
    placeholder="https://example.com"
    bind:value={link}
  ></GuestbookFormField>

  <GuestbookFormField
    title="Link label"
    name="hrefText"
    maxLength={32}
    placeholder="@username"
    bind:value={linkLabel}
  ></GuestbookFormField>

  <GuestbookFormField
    title="Avatar url"
    name="avatarUrl"
    type="url"
    inputmode="url"
    maxLength={512}
    placeholder="https://example.com/image.png"
    bind:value={avatarUrl}
  ></GuestbookFormField>

  <p
    class="guestbook-form__status"
    data-status={status.type}
    role="status"
    aria-live="polite"
    hidden={status.isHidden}
  >
    {status.text}
  </p>

  <Captcha bind:element={captchaWidget} />

  <button
    class="button guestbook-form__submit"
    type="submit"
    disabled={isDisabledButton}
    onclick={onSubmit}
  >
    {buttonText}
  </button>
  <p class="guestbook-form__submit-notice">Protected with PoW challenge</p>
</form>

<style>
  .guestbook-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    border-radius: 1.5rem;
    background: var(--surface-bg);
  }

  .guestbook-form__status {
    padding: 0.9rem 1rem;
    border-radius: 1rem;
    background: color-mix(in srgb, var(--success-color), transparent 84%);
    color: var(--text-color);
  }

  .guestbook-form__submit {
    width: 100%;
  }

  .guestbook-form__submit:disabled {
    cursor: wait;
    opacity: 0.7;
  }

  .guestbook-form__submit-notice {
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
  }

  .guestbook-form__status[data-status="error"] {
    background: var(--primary-surface-bg);
  }
</style>
