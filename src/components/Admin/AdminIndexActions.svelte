<script lang="ts">
  import { showModal } from "../../lib/modal";
  import AdminActions from "./AdminActions.svelte";

  import { tmAlert } from "../../lib/alert";
  import { BackendAPI } from "../../lib/api";
  import ModalConfirmContent from "../Modal/ModalConfirmContent.svelte";

  const links = [
    {
      href: "/admin/guestbook",
      title: "Guestbook",
    },
    {
      href: "/admin/projects",
      title: "Projects",
    },
    {
      href: "/admin/images",
      title: "Images",
    },
    {
      title: "Clear webring cache",
      onclick: () => {
        showModal(confirmClearWebringCache, "Clear webring cache");
      },
    },
    {
      href: "/admin/logout",
      title: "Logout",
    },
  ];
</script>

{#snippet confirmClearWebringCache()}
  <ModalConfirmContent
    buttonText="Clear"
    requiredText="CLEAR"
    loadingText="Clearing..."
    onClick={async () => {
      await BackendAPI.webring.clearCache();
      await tmAlert("Successfully cleared webring cache!");
    }}
    onError={async () => {
      await tmAlert("Failed to clear webring cache!");
    }}
  />
{/snippet}

<AdminActions title="Available links" {links} />
