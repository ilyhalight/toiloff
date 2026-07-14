<script lang="ts">
  type Props = {
    loading?: boolean;
    infoText: string;
    maxFileText?: string;
    accept: string | null | undefined;
    oninput: (files: FileList | null) => Promise<void>;
  };

  let {
    loading = false,
    infoText,
    maxFileText,
    accept,
    oninput,
  }: Props = $props();

  const uid = $props.id();
  let inputElement: HTMLInputElement;
  let fileDragging = $state(false);
  let hasFile = $state(false);

  async function inputFileHandle() {
    if (loading) {
      return;
    }

    console.log(inputElement.files);
    hasFile = true;

    return await oninput(inputElement.files);
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
    console.log("ondragenter", e);
    fileDragging = true;
  }}
  ondragleave={(e) => {
    e.preventDefault();
    fileDragging = false;
  }}
  ondragover={(e) => {
    e.preventDefault();
    console.log("ondragover", e);
    fileDragging = true;
  }}
>
  <p class="drop-zone__desc">
    {#if fileDragging}
      Отпустите, чтобы добавить выбранные файлы
    {:else if loading}
      Загрузка...
    {:else if hasFile}
      Файл выбран
    {:else}
      Нажмите или перетащите файл
    {/if}
  </p>
  <p class="drop-zone__info text-wrap">
    {infoText}
    {#if maxFileText}
      <br />
      (макс. размер {maxFileText})
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
