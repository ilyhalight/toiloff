<script lang="ts">
  import type { Projects } from "../../lib/api/projects";
  import SortableProjectsWrapper from "./SortableProjectsWrapper.svelte";
  import ProjectList from "./ProjectList.svelte";

  type Props = {
    projects?: Projects;
    nextCursor?: string | null;
    autoLoad?: boolean;
    isAdmin?: boolean;
  };

  let {
    projects = $bindable([]),
    nextCursor = $bindable(null),
    autoLoad = false,
    isAdmin = false,
  }: Props = $props();
</script>

<!-- astro hack, without this middle component, astro doesn't render it with client:load -->
<ProjectList
  {projects}
  {nextCursor}
  {autoLoad}
  {isAdmin}
  WrapperComponent={SortableProjectsWrapper}
/>
