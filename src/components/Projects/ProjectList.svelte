<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";

  import { BackendAPI } from "../../lib/api";
  import type { Projects } from "../../lib/api/projects";
  import ProjectsWrapper, {
    type Props as WrapperProps,
  } from "./ProjectsWrapper.svelte";
  import type { Props as SortableWrapperProps } from "./SortableProjectsWrapper.svelte";
  import SectionCard from "../Section/SectionCard.svelte";
  import SectionLoading from "../Section/SectionLoading.svelte";
  import type { Component } from "svelte";

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
  let isBigScreen = new MediaQuery("min-width: 1040px");

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
  <WrapperComponent {projects} {isAdmin}>
    {#if isBigScreen.current}
      {@render loadMoreBtn()}
    {/if}
  </WrapperComponent>
  {#if !isBigScreen.current}
    {@render loadMoreBtn()}
  {/if}
{/if}
