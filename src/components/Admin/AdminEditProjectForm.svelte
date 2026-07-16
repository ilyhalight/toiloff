<script lang="ts">
  import { tmAlert } from "../../lib/alert";
  import { BackendAPI } from "../../lib/api";
  import type { Project } from "../../lib/api/projects";
  import Form from "../Form/Form.svelte";
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";
  import FormSwitch from "../Form/FormSwitch.svelte";

  type Props = {
    project: Project;
  };

  let { project }: Props = $props();
  let { title, description, href, imageUrl, imageAlt, canShowOnMain } =
    $derived(project);

  async function submitAction() {
    await BackendAPI.projects.edit(project.id, {
      title,
      description,
      href,
      imageUrl,
      imageAlt,
      canShowOnMain,
    });
  }

  async function onSuccess() {
    await tmAlert("Successfully edited a project!");
    window.location.assign("/admin/projects");
  }
</script>

<Form
  {submitAction}
  {onSuccess}
  successMessage="Successfully edited a Project!"
  errorMessage="Failed to edit a Project!"
  defaultSubmitText="Edit"
  enabledCaptcha={false}
>
  {#snippet children()}
    <FormHead
      eyebrow="Edit"
      title="Edit details"
      description="Update the fields below and save your changes"
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
