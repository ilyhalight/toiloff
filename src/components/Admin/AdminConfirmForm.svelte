<script lang="ts">
  import Form from "../Form/Form.svelte";
  import FormHead from "../Form/FormHead.svelte";
  import { tmAlert } from "../../lib/alert";

  type Props = {
    submitAction: () => Promise<void>;
    title?: string;
    description?: string;
    successMessage?: string;
    errorMessage?: string;
    redirectUrl?: string;
  };

  let {
    submitAction,
    title = "Confirm action",
    description = "This action can't be undone",
    successMessage = "Successfully!",
    errorMessage = "Failed!",
    redirectUrl = "/admin",
  }: Props = $props();

  async function onSuccess() {
    await tmAlert(successMessage);
    window.location.assign(redirectUrl);
  }
</script>

<Form
  {submitAction}
  {onSuccess}
  {successMessage}
  {errorMessage}
  defaultSubmitText="Confirm"
  enabledCaptcha={false}
>
  {#snippet children()}
    <FormHead eyebrow="Admin" {title} {description} />
  {/snippet}
</Form>
