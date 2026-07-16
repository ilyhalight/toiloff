<script lang="ts">
  let { children } = $props();
</script>

<span class="form__actions">
  {@render children()}
</span>

<style>
  .form__actions {
    display: flex;
    position: absolute;
    right: 0.75rem;
    top: 2.75rem;
  }
</style>
