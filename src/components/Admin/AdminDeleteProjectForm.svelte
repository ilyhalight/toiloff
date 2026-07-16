<script lang="ts">
  import { BackendAPI } from "../../lib/api";
  import type { Project } from "../../lib/api/projects";
  import Form from "../Form/Form.svelte";
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";
  import { tmAlert } from "../../lib/alert";

  type Props = {
    project: Project;
  };

  let { project }: Props = $props();

  async function submitAction() {
    await BackendAPI.projects.delete(project.id);
  }

  async function onSuccess() {
    await tmAlert("Successfully deleted project!");
    window.location.assign("/admin/projects");
  }
</script>

<Form
  {submitAction}
  {onSuccess}
  successMessage="Successfully deleted from Projects!"
  errorMessage="Failed to delete a Project!"
  defaultSubmitText="Delete"
  enabledCaptcha={false}
>
  {#snippet children()}
    <FormHead
      eyebrow="Delete"
      title="Confirm deletion"
      description="This action can't be undone"
    />

    <FormField
      title="Project title"
      name="title"
      placeholder="Cool project"
      maxLength={48}
      required
      disabled
      value={project.title}
    />

    <FormField
      title="Description"
      name="description"
      placeholder="A super duper long description about project"
      maxLength={128}
      required
      disabled
      value={project.description}
    />
  {/snippet}
</Form>
