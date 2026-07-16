<script lang="ts">
  import { tmAlert } from "../../lib/alert";
  import { BackendAPI } from "../../lib/api";
  import Form from "../Form/Form.svelte";
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";

  let username = $state("");
  let password = $state("");

  async function submitAction(captchaPayload?: string) {
    await BackendAPI.auth.getToken({ username, password }, captchaPayload);
  }

  const onSuccess = async () => {
    await tmAlert("Login successful!");
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
      eyebrow="Provide creds"
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
