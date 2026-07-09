<script lang="ts">
  interface Props {
    title: string;
    name: string;
    maxLength?: number;
    placeholder?: string;
    required?: boolean;
    type?: "text" | "url" | "password";
    isTextarea?: boolean;
    inputmode?:
      | "text"
      | "url"
      | "search"
      | "none"
      | "tel"
      | "email"
      | "numeric"
      | "decimal"
      | null;
    value?: string | null;
    disabled?: boolean;
  }

  let {
    title,
    name,
    value = $bindable(),
    maxLength,
    placeholder,
    required,
    type = "text",
    isTextarea = false,
    disabled = false,
    inputmode,
  }: Props = $props();
</script>

<label class="form__field" for="form-{name}">
  <span class="form__label">
    {title}
    {#if !required}
      <small>optional</small>
    {/if}
  </span>
  {#if isTextarea}
    <textarea
      class="form__control form__control_textarea"
      id="form-{name}"
      {name}
      {inputmode}
      autocomplete="off"
      maxlength={maxLength}
      {placeholder}
      {required}
      {disabled}
      bind:value
    ></textarea>
  {:else}
    <input
      class="form__control"
      id="form-{name}"
      {name}
      {inputmode}
      {type}
      autocomplete="off"
      maxlength={maxLength}
      {placeholder}
      {required}
      {disabled}
      bind:value
    />
  {/if}
</label>

<style>
  .form__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form__label {
    color: var(--text-muted);
    font-weight: 700;
    user-select: none;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .form__label small {
    color: var(--text-muted);
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }

  .form__control {
    width: 100%;
    padding: 1rem 1.1rem;
    border: 1px solid transparent;
    border-radius: 1rem;
    background: var(--onsurface-bg);
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease,
      color 0.2s ease;
  }

  .form__control:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    color: var(--text-muted);
  }

  .form__control:not([disabled]):hover,
  .form__control:not([disabled]):focus {
    background: var(--onsurface-hover-bg);
  }

  .form__control:not([disabled]):focus {
    border-color: var(--stroke-color);
    box-shadow: 0 0 0 0.2rem var(--onsurface-bg);
  }

  .form__control_textarea {
    min-height: 9rem;
    resize: vertical;
  }
</style>
