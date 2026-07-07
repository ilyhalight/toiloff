<script lang="ts">
  interface Props {
    title: string;
    name: string;
    maxLength?: number;
    placeholder?: string;
    required?: boolean;
    type?: "text" | "url";
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
    value?: string;
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
    inputmode,
  }: Props = $props();
</script>

<label class="guestbook-form__field" for="guestbook-{name}">
  <span class="guestbook-form__label">
    {title}
    {#if !required}
      <small>optional</small>
    {/if}
  </span>
  {#if isTextarea}
    <textarea
      class="guestbook-form__control guestbook-form__control_textarea"
      id="guestbook-{name}"
      {name}
      {inputmode}
      autocomplete="off"
      maxlength={maxLength}
      {placeholder}
      {required}
      bind:value
    ></textarea>
  {:else}
    <input
      class="guestbook-form__control"
      id="guestbook-{name}"
      {name}
      {inputmode}
      autocomplete="off"
      maxlength={maxLength}
      {placeholder}
      {required}
      bind:value
    />
  {/if}
</label>

<style>
  .guestbook-form__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .guestbook-form__label {
    color: var(--text-muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .guestbook-form__label small {
    color: var(--text-muted);
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }

  .guestbook-form__control {
    width: 100%;
    padding: 1rem 1.1rem;
    border: 1px solid transparent;
    border-radius: 1rem;
    background: var(--onsurface-bg);
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .guestbook-form__control:hover,
  .guestbook-form__control:focus {
    background: var(--onsurface-hover-bg);
  }

  .guestbook-form__control:focus {
    border-color: var(--stroke-color);
    box-shadow: 0 0 0 0.2rem var(--onsurface-bg);
  }

  .guestbook-form__control_textarea {
    min-height: 9rem;
    resize: vertical;
  }
</style>
