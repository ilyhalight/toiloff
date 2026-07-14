<script lang="ts">
  import type { Project } from "../../lib/api/projects";
  import ProjectAdminItem from "./ProjectAdminItem.svelte";
  import ProjectEmpty from "./ProjectEmpty.svelte";
  import ProjectItem from "./ProjectItem.svelte";

  type Props = {
    projects: Project[];
    isAdmin?: boolean;
  };

  let { projects, isAdmin = false }: Props = $props();
  let isEmpty = $derived(projects.length === 0);
  let ProjectComponent = $derived(isAdmin ? ProjectAdminItem : ProjectItem);
</script>

<ul class="projects" class:projects_admin={isAdmin}>
  {#if isEmpty}
    <ProjectEmpty />
  {:else}
    {#each projects as project}
      <ProjectComponent {project} />
    {/each}
  {/if}
</ul>

<style>
  .projects {
    display: grid;
    gap: 1rem;
    list-style: none;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .projects_admin {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (max-width: 500px) {
    .projects {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
