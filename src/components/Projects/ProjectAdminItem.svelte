<script lang="ts">
  import type { Project } from "../../lib/api/projects";
  import DeleteIcon from "../Icones/DeleteIcon.svelte";
  import EditIcon from "../Icones/EditIcon.svelte";
  // import GripIcon from "../Icones/GripIcon.svelte";

  type Props = {
    project: Project;
  };

  let { project }: Props = $props();
</script>

<li class="project">
  <!-- <div class="project-grip">
    <GripIcon />
  </div> -->
  <div class="project-content">
    <h4 class="project-content__title">{project.title}</h4>
    <p class="project-content__desc">{project.description}</p>
  </div>
  <ul class="project-actions">
    <li class="project-action">
      <a
        class="project-action__link"
        href="/admin/projects/{project.id}/edit"
        data-action="edit"
        aria-label="Edit project"><EditIcon /></a
      >
    </li>
    <li class="project-action">
      <a
        class="project-action__link"
        href="/admin/projects/{project.id}/delete"
        data-action="delete"
        aria-label="Delete project"><DeleteIcon /></a
      >
    </li>
  </ul>
</li>

<style>
  .project {
    display: flex;
    gap: 0.5rem;
    background: var(--onsurface-bg);
    border-radius: 1rem;
    padding: 0.75rem 1.25rem;
  }

  @media screen and (max-width: 500px) {
    .project {
      flex-direction: column;
    }
  }

  /* .project-grip {
    display: flex;
    font-size: 1.5rem;
    height: fit-content;
    cursor: pointer;
    color: var(--text-muted);
  } */

  .project-content {
    flex: 1;
  }

  .project-content__title {
    font-weight: 600;
    font-size: 1.125rem;
  }

  .project-actions {
    list-style: none;
    display: flex;
    gap: 0.25rem;
    font-size: 1.25rem;
  }

  .project-action {
    height: fit-content;
  }

  .project-action__link {
    display: flex;
    padding: 0.5rem;
    color: var(--text-muted);
    transition: color 0.25s ease;
  }

  .project-action__link[data-action="delete"] {
    color: color-mix(in srgb, var(--primary-color), transparent 35%);
  }

  .project-action__link:hover {
    color: var(--text-color);
  }

  .project-action__link[data-action="delete"]:hover {
    color: var(--primary-color);
  }
</style>
