<script lang="ts">
  import { tmAlert } from "../../lib/alert";

  type ValidationErrorStatus = {
    msg: string;
    success: false;
  };
  type ValidationSuccessStatus = {
    msg: null;
    success: true;
  };

  type ValidationStatus = ValidationErrorStatus | ValidationSuccessStatus;

  type Props = {
    loading?: boolean;
    shouldValidate?: boolean;
    infoText: string;
    maxFileText?: string;
    maxFileSize?: number;
    accept: string | null | undefined;
    oninput: (files: FileList | null) => Promise<void>;
    onerror?: (err: ValidationErrorStatus) => Promise<void>;
  };

  const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

  let {
    loading = false,
    shouldValidate = true,
    infoText,
    maxFileText,
    accept,
    oninput,
    onerror = () => new Promise((resolve) => resolve()),
  }: Props = $props();

  const uid = $props.id();
  let inputElement: HTMLInputElement;
  let fileDragging = $state(false);
  let hasFile = $state(false);
  let acceptTypes = $derived(accept?.split(", "));

  async function inputFileHandle() {
    if (loading) {
      return;
    }

    if (!shouldValidate || !inputElement.files) {
      hasFile = true;
      return await oninput(inputElement.files);
    }

    const error = Array.from(inputElement.files)
      .map((file) => validateFile(file))
      .find((result) => !result.success);
    if (error) {
      inputElement.files = null;
      await tmAlert(error.msg);
      return await onerror(error);
    }

    hasFile = true;
    return await oninput(inputElement.files);
  }

  export function validateFile(file: File | null): ValidationStatus {
    if (!file) {
      return { msg: "File not found", success: false };
    }

    // make it as variable
    if (file.size > MAX_FILE_SIZE) {
      return { msg: "File too large!", success: false };
    }

    if (acceptTypes && !acceptTypes.includes(file.type)) {
      return {
        msg: `Invalid file format!`,
        success: false,
      };
    }

    return {
      msg: null,
      success: true,
    };
  }
</script>

<label
  class="drop-zone"
  class:active={fileDragging}
  class:disabled={loading}
  class:has-file={hasFile}
  for={uid}
  ondrop={(event) => {
    event.preventDefault();
    fileDragging = false;
    inputElement.files = event.dataTransfer?.files ?? null;
    inputFileHandle();
  }}
  ondragenter={(e) => {
    e.preventDefault();
    fileDragging = true;
  }}
  ondragleave={(e) => {
    e.preventDefault();
    fileDragging = false;
  }}
  ondragover={(e) => {
    e.preventDefault();
    fileDragging = true;
  }}
>
  <p class="drop-zone__desc">
    {#if fileDragging}
      Drop to add selected files
    {:else if loading}
      Uploading...
    {:else if hasFile}
      File selected
    {:else}
      Click or drag a file here
    {/if}
  </p>
  <p class="drop-zone__info text-wrap">
    {infoText}
    {#if maxFileText}
      <br />
      (max. size {maxFileText})
    {/if}
  </p>
  <input
    type="file"
    id={uid}
    {accept}
    hidden
    onchange={inputFileHandle}
    bind:this={inputElement}
  />
</label>

<style>
  .drop-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    width: 100%;
    height: 150px;
    border: 2px dashed var(--stroke-color);
    border-radius: 1rem;
    padding: 1rem;
    text-align: center;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.25s ease;
  }

  .drop-zone:not(.disabled):not(.has-file):hover {
    border-color: var(--primary-color);
  }

  .drop-zone.active {
    border-style: solid;
    border-color: var(--primary-color);
  }

  .drop-zone.disabled {
    cursor: not-allowed;
    opacity: 0.6;
    border-style: solid;
    color: var(--text-muted);
  }

  .drop-zone.has-file {
    border-style: solid;
    border-color: var(--success-color);
  }

  .drop-zone__info {
    font-size: 0.8rem;
    color: var(--text-muted);
  }
</style>
