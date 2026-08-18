<script lang="ts">
  import { BackendAPI } from "../../lib/api";
  import type { Projects } from "../../lib/api/projects";
  import ProjectsWrapper, {
    type Props as WrapperProps,
  } from "./ProjectsWrapper.svelte";
  import type { Props as SortableWrapperProps } from "./SortableProjectsWrapper.svelte";
  import SectionCard from "../Section/SectionCard.svelte";
  import SectionLoading from "../Section/SectionLoading.svelte";
  import { type Component } from "svelte";
  import InfinityScroll from "../Utils/InfinityScroll.svelte";

  type Props = {
    projects?: Projects;
    nextCursor?: string | null;
    autoLoad?: boolean;
    isAdmin?: boolean;
    WrapperComponent?: Component<WrapperProps | SortableWrapperProps>;
  };

  let {
    projects = $bindable([]),
    nextCursor = $bindable(null),
    autoLoad = false,
    isAdmin = false,
    WrapperComponent = ProjectsWrapper,
  }: Props = $props();

  let error = $state<Error | null>(null);
  let isLoading = $state(true);

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

{#if isLoading && !projects.length}
  <SectionLoading />
{:else if error}
  <SectionCard title="Error">{error.message}</SectionCard>
{:else}
  <WrapperComponent {projects} {isAdmin}>
    {#if isLoading}
      <SectionLoading />
    {/if}
  </WrapperComponent>
  <InfinityScroll
    condition={() => !!nextCursor && !isLoading}
    onIntersect={async () => {
      isLoading = true;
      try {
        await loadProjects(nextCursor);
      } finally {
        isLoading = false;
      }
    }}
  />
{/if}
