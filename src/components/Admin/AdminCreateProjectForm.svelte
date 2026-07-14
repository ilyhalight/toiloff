<script lang="ts">
  import { BackendAPI } from "../../lib/api";
  import Form from "../Form/Form.svelte";
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";
  import FormSwitch from "../Form/FormSwitch.svelte";

  let title = $state("");
  let description = $state("");
  let href = $state("");
  let imageUrl = $state("");
  let imageAlt = $state("");
  let canShowOnMain = $state(true);

  async function submitAction() {
    await BackendAPI.projects.create({
      title,
      description,
      href,
      imageUrl,
      imageAlt,
      canShowOnMain,
    });
  }

  async function onSuccess() {
    console.log(
      "Successfully added new project! Redirecting to projects list...",
    );
    window.location.assign("/admin/projects");
  }
</script>

<Form
  {submitAction}
  {onSuccess}
  successMessage="Successfully added new Project!"
  errorMessage="Failed to create new Project!"
  defaultSubmitText="Create"
  enabledCaptcha={false}
>
  {#snippet children()}
    <FormHead
      eyebrow="Create project"
      title="New project"
      description="Create a new project and make it available on your website"
    />

    <FormField
      title="Project title"
      name="title"
      placeholder="Cool project"
      maxLength={48}
      required
      bind:value={title}
    />

    <FormField
      title="Description"
      name="description"
      placeholder="A super duper long description about project"
      maxLength={128}
      required
      bind:value={description}
    />

    <FormField
      title="Link to project"
      name="href"
      placeholder="https://example.com"
      maxLength={512}
      required
      bind:value={href}
    />

    <FormField
      title="Visible image (url)"
      name="imageUrl"
      placeholder="https://example.com/something.png"
      maxLength={512}
      required
      bind:value={imageUrl}
    />

    <FormField
      title="Visible image (alt text)"
      name="imageAlt"
      placeholder="Chibi anime girl peeking through a doorway with glowing spiral eyes and pink cherry blossom petals."
      maxLength={128}
      required
      bind:value={imageAlt}
    />

    <FormSwitch
      title="Show on homepage"
      name="canShowOnMain"
      description="Make this project visible on the homepage"
      bind:checked={canShowOnMain}
    />
  {/snippet}
</Form>
