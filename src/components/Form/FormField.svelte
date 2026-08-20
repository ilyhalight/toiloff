<script lang="ts">
  import type { Snippet } from "svelte";
  import FormLabel from "./FormLabel.svelte";

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
    children?: Snippet;
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
    children,
  }: Props = $props();
</script>

<label class="form__field" for="form-{name}">
  <FormLabel {title} {required} />
  {#if isTextarea}
    <textarea
      class="textfield form__control form__control_textarea"
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
      class="textfield form__control"
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
  {#if children}
    {@render children()}
  {/if}
</label>

<style>
  .form__field {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0.5rem;
  }

  .form__control {
    width: 100%;
  }

  .form__control_textarea {
    min-height: 9rem;
    resize: vertical;
  }
</style>
