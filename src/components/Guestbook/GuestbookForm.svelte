<script lang="ts">
  import FormField from "../Form/FormField.svelte";
  import FormHead from "../Form/FormHead.svelte";
  import { type Status } from "../Form/FormStatus.svelte";

  import { BackendAPI } from "../../lib/api/";
  import Form from "../Form/Form.svelte";
  import FormDropzone from "../Form/FormDropzone.svelte";

  let username = $state("");
  let content = $state("");
  let link: string | undefined = $state(undefined);
  let linkLabel: string | undefined = $state(undefined);
  let avatarUrl: string | undefined = $state(undefined);
  let avatar: File | undefined = $state(undefined);

  const MAX_AVATAR_SIZE = 1024 * 1024 * 5; // 5MB

  let status: Status = $state({
    isHidden: true,
    type: "success",
    text: "",
  });

  async function submitAction(captchaPayload?: string) {
    await BackendAPI.guestbook.createMessage(
      {
        username,
        content,
        href: link,
        hrefText: linkLabel,
        avatar,
      },
      captchaPayload,
    );
  }

  async function inputAvatarHandle(files: FileList | null) {
    const file = files?.[0];
    if (!file) {
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      // TODO: rewrite with toast
      alert("Файл слишком большой. Максимальный размер 5MB.");
      return;
    }

    // if (
    //   !["image/png", "image/jpeg", "image/gif", "image/webp"].includes(
    //     file.type,
    //   )
    // ) {
    //   // TODO: rewrite with toast
    //   alert(
    //     "Неверный формат файла. Поддерживаемые форматы: PNG, JPEG, GIF, WEBP.",
    //   );
    //   return;
    // }

    avatar = file;
  }
</script>

<Form
  successMessage="Thanks! Your message is awaiting moderation."
  errorMessage="Failed to send message! Please try again."
  defaultSubmitText="Send for moderation"
  enabledCaptcha={true}
  {submitAction}
  {status}
>
  {#snippet children()}
    <FormHead
      eyebrow="Create message"
      title="Write smth"
      description="This can be anything, within reason"
    />
    <FormField
      title="Name"
      name="username"
      maxLength={32}
      placeholder="Anonymous"
      required
      bind:value={username}
    ></FormField>

    <FormField
      title="Message"
      name="content"
      maxLength={4096}
      placeholder="Say something..."
      isTextarea={true}
      required
      bind:value={content}
    ></FormField>

    <FormField
      title="Link"
      name="href"
      type="url"
      inputmode="url"
      maxLength={512}
      placeholder="https://example.com"
      bind:value={link}
    ></FormField>

    <FormField
      title="Link label"
      name="hrefText"
      maxLength={32}
      placeholder="@username"
      bind:value={linkLabel}
    ></FormField>

    <FormField
      title="Avatar url"
      name="avatarUrl"
      type="url"
      inputmode="url"
      maxLength={512}
      placeholder="https://example.com/image.png"
      bind:value={avatarUrl}
    ></FormField>

    <FormDropzone
      infoText="Поддерживаемые форматы: PNG, JPEG, GIF, WEBP"
      maxFileText="5MB"
      accept="image/png, image/jpeg, image/gif, image/webp"
      oninput={inputAvatarHandle}
    />
  {/snippet}
</Form>
