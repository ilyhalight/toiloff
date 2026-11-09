<script lang="ts">
  import type { Project } from "../../lib/api/projects";
  import ArrowIcon from "../Icones/ArrowIcon.svelte";

  type Props = {
    project: Project;
  };

  let { project }: Props = $props();
  let { title, description, href, imageUrl, imageAlt } = $derived(project);
</script>

<li class="project-item" data-id={project.id}>
  <a class="project-item__image-wrapper" {href} target="_blank">
    <img
      class="project-item__image"
      src={imageUrl}
      alt={imageAlt}
      loading="lazy"
    />
  </a>
  <a class="project-item__link" {href} target="_blank">
    <h3>{title}</h3>
    <span class="project-item__link-icon">
      <ArrowIcon />
    </span>
  </a>
  <p class="project-item__desc text-wrap">
    {description}
  </p>
</li>

<style>
  .project-item {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.25rem;
    max-width: 450px;
    border-radius: 1rem;
    background: var(--surface-bg);
  }

  @media screen and (min-width: 501px) and (max-width: 703px) {
    .project-item {
      max-width: 100%;
    }
  }

  .project-item__image-wrapper {
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    border-radius: 0.85rem;
  }

  @media screen and (min-width: 704px) {
    .project-item__image-wrapper {
      max-height: 170px;
    }
  }

  .project-item__image {
    width: 100%;
    border-radius: 0.85rem;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .project-item__link {
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;
    margin-top: 0.5rem;
    transition: color 0.25s ease;
  }

  .project-item__link-icon :global(svg) {
    font-size: 2rem;
    transform: rotate(45deg);
    will-change: transform;
    transition: transform 0.25s ease;
  }

  .project-item__link:hover,
  .project-item:has(.project-item__image-wrapper:hover) .project-item__link {
    color: var(--primary-color);
  }

  .project-item__link:hover .project-item__link-icon :global(svg),
  .project-item:has(.project-item__image-wrapper:hover)
    .project-item__link-icon
    :global(svg) {
    transform: rotate(90deg);
  }

  .project-item:hover .project-item__image {
    transform: scale(1.035);
  }

  .project-item__desc {
    color: var(--text-muted);
  }
</style>
