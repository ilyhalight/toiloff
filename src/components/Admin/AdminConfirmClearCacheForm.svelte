<script lang="ts">
  import { BackendAPI } from "../../lib/api";
  import AdminConfirmForm from "./AdminConfirmForm.svelte";

  async function submitAction() {
    await BackendAPI.webring.clearCache();
  }
</script>

<AdminConfirmForm
  {submitAction}
  successMessage="Cache cleared successfully!"
  errorMessage="Failed to clear cache!"
/>
