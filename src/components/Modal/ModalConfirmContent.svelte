<script lang="ts">
  import { tmAlert } from "../../lib/alert";
  import { closeModal } from "../../lib/modal";

  type Props = {
    buttonText?: string;
    requiredText?: string;
    loadingText?: string;
    onClick?: () => void | Promise<void>;
    onError?: () => void | Promise<void>;
  };

  const {
    requiredText = "CONFIRM",
    buttonText = "Confirm",
    loadingText = "Loading...",
    onClick,
    onError,
  }: Props = $props();

  let value = $state("");
  let isLoading = $state(false);
  const isValid = $derived(value === requiredText);

  async function handleClick() {
    if (!isValid) {
      tmAlert(`Please type '${requiredText}' to confirm`);
      return;
    }

    isLoading = true;
    try {
      await onClick?.();
      closeModal();
    } catch (err) {
      await onError?.();
    } finally {
      isLoading = false;
    }
  }
</script>

<input
  class="textfield"
  type="text"
  placeholder={`Type '${requiredText}' to confirm`}
  bind:value
/>
<div>
  <button
    class="button button_primary"
    class:button_loading={isLoading}
    onclick={handleClick}
    disabled={!isValid || isLoading}
    >{isLoading ? loadingText : buttonText}</button
  >
</div>

<style>
  .button.button_primary:disabled {
    background: var(--primary-surface-bg);
  }
</style>
