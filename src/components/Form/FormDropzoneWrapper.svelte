<script lang="ts">
  import FormLabel from "./FormLabel.svelte";

  type Props = {
    title: string;
    required?: boolean;
    children: any;
  };

  let { title, required, children }: Props = $props();
</script>

<div class="form-dropzone__wrapper">
  <FormLabel {title} {required} />
  {@render children()}
</div>

<style>
  .form-dropzone__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
