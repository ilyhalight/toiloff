<script lang="ts">
  import { tmAlert } from "../../lib/alert";
  import { BackendAPI } from "../../lib/api";
  import Form from "../Form/Form.svelte";
  import FormDropzone from "../Form/FormDropzone.svelte";
  import FormDropzoneWrapper from "../Form/FormDropzoneWrapper.svelte";
  import FormHead from "../Form/FormHead.svelte";

  let image: File | undefined = $state(undefined);

  async function submitAction() {
    if (!image) {
      throw new Error("Image not found. Try again, idk...");
    }

    await BackendAPI.adminImages.upload(image);
  }

  const onSuccess = async () => {
    await tmAlert("Upload image successful!");
    window.location.assign("/admin/images");
  };

  async function inputFileHandle(files: FileList | null) {
    const file = files?.item(0);
    if (!file) {
      return;
    }

    image = file;
  }
</script>

<Form
  {submitAction}
  {onSuccess}
  successMessage="Upload image successful!"
  errorMessage="Upload image failed!"
  enabledCaptcha={false}
>
  {#snippet children()}
    <FormHead
      eyebrow="Images"
      title="Upload image"
      description="Upload a image to server"
    />

    <FormDropzoneWrapper title="Image" required={true}>
      <FormDropzone
        infoText="Supported formats: PNG, JPEG, GIF, WEBP"
        maxFileText="5MB"
        accept="image/png, image/jpeg, image/gif, image/webp"
        oninput={inputFileHandle}
      />
    </FormDropzoneWrapper>
  {/snippet}
</Form>
