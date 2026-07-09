<script lang="ts">
  import { BackendAPI } from "../../lib/api";
  import Form from "../Form/Form.svelte";
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";
  import { type Status } from "../Form/FormStatus.svelte";

  let username = $state("");
  let password = $state("");
  let status: Status = $state({
    isHidden: true,
    type: "success",
    text: "",
  });

  async function submitAction(captchaPayload?: string) {
    await BackendAPI.auth.getToken({ username, password }, captchaPayload);
  }

  const onSuccess = () => {
    console.log("Login successful! Redirecting to admin panel...");
    window.location.assign("/admin");
  };
</script>

<Form
  {status}
  {submitAction}
  {onSuccess}
  successMessage="Login successful!"
  errorMessage="Login failed!"
  enabledCaptcha={false}
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
