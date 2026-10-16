<script lang="ts">
  import { getToken } from "../../lib/api/auth";
  import Form from "../Form/Form.svelte";
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";

  let username = $state("");
  let password = $state("");

  async function submitAction(captchaPayload?: string) {
    await getToken({ username, password }, captchaPayload);
  }

  const onSuccess = async () => {
    window.location.assign("/admin");
  };
</script>

<Form
  {submitAction}
  {onSuccess}
  successMessage="Login successful!"
  errorMessage="Login failed!"
  enabledCaptcha={true}
>
  {#snippet children()}
    <FormHead
      title="Admin auth"
      description="Enter your admin credentials to access protected tools"
    />

    <FormField
      title="Username"
      name="username"
      placeholder="user"
      required
      bind:value={username}
    />

    <FormField
      title="Password"
      name="password"
      type="password"
      placeholder="••••••••"
      required
      bind:value={password}
    />
  {/snippet}
</Form>
