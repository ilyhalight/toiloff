<script lang="ts">
  type Props = {
    fitContent?: boolean;
    checked?: boolean;
    name?: string;
    text?: string;
  };

  let {
    fitContent = false,
    name,
    checked = $bindable(false),
    text,
  }: Props = $props();
</script>

<label
  class="switch"
  class:switch_fit={fitContent}
  aria-label="Switch something"
>
  <span class="switch-pointer__wrapper" data-checked={checked}>
    <input
      class="switch-control"
      role="switch"
      type="checkbox"
      hidden
      {name}
      bind:checked
    />
    <span class="switch-pointer"></span>
  </span>
  {#if text}
    <span class="switch-text text-wrap">{text}</span>
  {/if}
</label>

<style>
  .switch {
    --switch-bg: var(--external-switch-bg, var(--onsurface-bg));
    --pointer-bg: var(--external-pointer-bg, var(--surface-bg));
    --pointer-checked-bg: var(--external-pointer-checked-bg, var(--pointer-bg));
    display: flex;
    gap: 1rem;
  }

  .switch_fit {
    width: fit-content;
    height: fit-content;
  }

  .switch-pointer__wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 1.5em;
    min-width: 3em;
    position: relative;
    overflow: hidden;
  }

  .switch-pointer__wrapper:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: var(--switch-bg);
  }

  .switch-pointer__wrapper[data-checked="true"]:before {
    background: var(--primary-color);
  }

  .switch-pointer {
    margin-left: 0.25rem;
    background: var(--pointer-bg);
    width: 1em;
    height: 1em;
    border-radius: 50%;
    will-change: transform;
    transition: transform 0.35s ease;
  }

  .switch-text {
    display: flex;
    align-items: center;
  }

  .switch-pointer__wrapper[data-checked="true"] .switch-pointer {
    background: var(--pointer-checked-bg);
    transform: translateX(150%);
  }
</style>
