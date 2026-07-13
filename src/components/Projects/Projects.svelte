<script lang="ts">
  import type { Project } from "../../lib/api/projects";
  import ProjectEmpty from "./ProjectEmpty.svelte";
  import ProjectItem from "./ProjectItem.svelte";

  type Props = {
    projects: Project[];
  };

  let { projects }: Props = $props();
  let isEmpty = $derived(projects.length === 0);
</script>

<ul class="projects">
  {#if isEmpty}
    <ProjectEmpty />
  {:else}
    {#each projects as project}
      <ProjectItem {project} />
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

  @media screen and (max-width: 500px) {
    .projects {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
