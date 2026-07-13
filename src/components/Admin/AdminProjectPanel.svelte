<script lang="ts">
  import { BackendAPI } from "../../lib/api";
  import type { Project, Projects } from "../../lib/api/projects";
  import ProjectItem from "../Projects/ProjectItem.svelte";
  import ProjectsComponent from "../Projects/Projects.svelte";
  import SectionCard from "../Section/SectionCard.svelte";
  import SectionLoading from "../Section/SectionLoading.svelte";
  import AdminActions, { type Link } from "./AdminActions.svelte";

  const links: Link[] = [
    {
      title: "Create",
      href: "/admin/projects/create",
    },
  ];

  let error = $state<Error | null>(null);
  let isLoading = $state(false);
  let nextCursor: string | null = $state(null);
  let projects = $state<Projects>([]);

  $effect(() => {
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

<AdminActions title="Actions" {links} />

{#if isLoading && !projects.length}
  <SectionLoading />
{:else if error}
  <SectionCard title="Error">{error.message}</SectionCard>
{:else}
  <ProjectsComponent {projects} />
  {#if nextCursor}
    <button
      class="button"
      disabled={isLoading}
      onclick={async () => await loadProjects(nextCursor)}>Load more</button
    >
  {/if}
{/if}
