<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";

  import { BackendAPI } from "../../lib/api";
  import type { Projects } from "../../lib/api/projects";
  import ProjectsComponent from "./Projects.svelte";
  import SectionCard from "../Section/SectionCard.svelte";
  import SectionLoading from "../Section/SectionLoading.svelte";

  let error = $state<Error | null>(null);
  let isLoading = $state(true);
  let isBigScreen = new MediaQuery("min-width: 1040px");

  let {
    projects = $bindable<Projects>([]),
    nextCursor = $bindable<string | null>(null),
    autoLoad = false,
    isAdmin = false,
  } = $props();

  $effect(() => {
    if (!autoLoad) {
      isLoading = false;
      return;
    }

    void (async () => {
      error = null;
      isLoading = true;
      try {
        await loadProjects();
      } catch (err) {
        console.error("Failed to load projects:", err);
        error = err as Error;
      } finally {
        isLoading = false;
      }
    })();
  });

  async function loadProjects(cursor?: string | null) {
    const result = await BackendAPI.projects.getAll(cursor);
    if (!result.items.length) {
      throw new Error("No projects found");
    }

    nextCursor = result.nextCursor;
    if (cursor) {
      projects = [...projects, ...result.items];
    } else {
      projects = result.items;
    }

    return projects;
  }
</script>

{#snippet loadMoreBtn()}
  {#if nextCursor}
    <button
      class="button"
      disabled={isLoading}
      onclick={async () => await loadProjects(nextCursor)}>Load more</button
    >
  {/if}
{/snippet}

{#if isLoading && !projects.length}
  <SectionLoading />
{:else if error}
  <SectionCard title="Error">{error.message}</SectionCard>
{:else}
  <ProjectsComponent {projects} {isAdmin}>
    {#if isBigScreen.current}
      {@render loadMoreBtn()}
    {/if}
  </ProjectsComponent>
  {#if !isBigScreen.current}
    {@render loadMoreBtn()}
  {/if}
{/if}
