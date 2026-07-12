<script lang="ts">
  import Form from "../Form/Form.svelte";
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";
  import SectionCard from "../Section/SectionCard.svelte";

  let title = $state("");
  let description = $state("");
  let href = $state("");
  let imageUrl = $state("");
  let imageAlt = $state("");
  let canShowOnMain = $state("");

  async function submitAction() {
    console.log("submit");
  }

  async function onSuccess() {
    console.log("onsuccess");
  }
</script>

<Form
  {submitAction}
  {onSuccess}
  successMessage="Successfully added new Project!"
  errorMessage="Failed to create new Project!"
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
  {/snippet}
</Form>
