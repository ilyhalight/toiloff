<script lang="ts">
  import Switch from "../Control/Switch.svelte";

  type Props = {
    title: string;
    description: string;
    name?: string;
    checked?: boolean;
  };

  let {
    title,
    description,
    name,
    checked = $bindable(false),
  }: Props = $props();
</script>

<div class="form-switch">
  <div class="form-switch__content">
    <h5 class="form-switch__content-title">{title}</h5>
    <p class="form-switch__content-desc">{description}</p>
  </div>
  <Switch bind:checked fitContent={true} {name} />
</div>

<style>
  .form-switch {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: 1rem;
    background: var(--onsurface-bg);
    --external-switch-bg: var(--surface-bg);
    --external-pointer-bg: var(--text-muted);
    --external-pointer-checked-bg: var(--text-color);
  }

  .form-switch__content-title {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .form-switch__content-desc {
    color: var(--text-muted);
  }
</style>
