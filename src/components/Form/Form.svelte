<script lang="ts">
  import { tmAlert } from "../../lib/alert";
  import Captcha from "../Captcha/Captcha.svelte";
  import FormStatus from "./FormStatus.svelte";

  export type Status = {
    isHidden: boolean;
    type: "error" | "success";
    text: string;
  };

  type Props = {
    status?: Status;
    successMessage: string;
    errorMessage: string;
    defaultSubmitText?: string;
    submitAction: (captchaPayload?: string) => Promise<void>;
    onSuccess?: () => void;
    children: any;
    enabledCaptcha?: boolean;
    form?: HTMLFormElement | null;
  };

  let {
    status = $bindable({
      isHidden: true,
      type: "success",
      text: "",
    }),
    submitAction,
    onSuccess = () => void 0,
    successMessage,
    errorMessage,
    defaultSubmitText = "Submit",
    children,
    enabledCaptcha = false,
    form = $bindable(null),
  }: Props = $props();

  let captchaWidget: Captcha | null = $state(null);

  // svelte-ignore state_referenced_locally
  let buttonText = $state(defaultSubmitText);
  let isDisabledButton = $state(false);

  async function submitForm(captchaPayload?: string) {
    try {
      await submitAction(captchaPayload);

      status = {
        isHidden: false,
        type: "success",
        text: successMessage,
      };

      form?.reset();
      await tmAlert(successMessage);
      onSuccess();
    } catch (err) {
      const text = (err as Error).message ?? errorMessage;
      status = {
        isHidden: false,
        type: "error",
        text,
      };
      await tmAlert(text);
    } finally {
      buttonText = defaultSubmitText;
      isDisabledButton = false;
    }
  }

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!form) {
      return;
    }

    status.isHidden = true;
    isDisabledButton = true;
    buttonText = "Validating...";
    if (!form.checkValidity()) {
      buttonText = defaultSubmitText;
      isDisabledButton = false;
      return form.reportValidity();
    }

    if (!enabledCaptcha || !captchaWidget) {
      buttonText = "Sending...";
      return await submitForm();
    }

    buttonText = "Calculating...";
    const captchaPayload = await captchaWidget?.run();
    if (typeof captchaPayload !== "string") {
      const text = "Captcha verification failed. Please try again.";
      status = {
        isHidden: false,
        type: "error",
        text,
      };
      buttonText = defaultSubmitText;
      isDisabledButton = false;
      await tmAlert(text);
      return;
    }

    buttonText = "Sending...";
    return await submitForm(captchaPayload);
  }
</script>

<form class="form" bind:this={form}>
  {@render children?.()}

  <FormStatus {status} />
  {#if enabledCaptcha}
    <Captcha bind:this={captchaWidget} />
  {/if}

  <button
    class="button form__submit"
    class:button_loading={isDisabledButton}
    type="submit"
    disabled={isDisabledButton}
    onclick={onSubmit}
  >
    {buttonText}
  </button>
  {#if enabledCaptcha}
    <p class="form__submit-notice">Protected with PoW challenge</p>
  {/if}
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    border-radius: 1.5rem;
    background: var(--surface-bg);
  }

  .form__submit {
    width: 100%;
  }

  .form__submit-notice {
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
  }
</style>
