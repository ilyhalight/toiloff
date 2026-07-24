<script lang="ts">
  import Sortable from "sortablejs";

  import { onMount } from "svelte";

  import ProjectsWrapper from "./ProjectsWrapper.svelte";
  import type { Project } from "../../lib/api/projects";
  import { BackendAPI } from "../../lib/api";

  export type Props = {
    projects: Project[];
    isAdmin?: boolean;
    children?: any;
  };

  let { projects, isAdmin = false, children }: Props = $props();

  // svelte-ignore non_reactive_update
  let rootRef: HTMLElement | null = null;

  onMount(() => {
    if (!rootRef) {
      return;
    }

    Sortable.create(rootRef, {
      group: {
        name: "projects-list",
      },
      handle: ".project-grip",
      onEnd: async (evt) => {
        if (evt.oldIndex === evt.newIndex) {
          return;
        }

        const currentEl = evt.item;
        const currentId = currentEl.dataset.id;
        if (!currentId) {
          console.warn("Current element doesn't have a data-id attribute");
          return;
        }

        const afterId = (currentEl.previousElementSibling as HTMLElement)
          ?.dataset.id;
        const beforeId = (currentEl.nextElementSibling as HTMLElement)?.dataset
          .id;
        await BackendAPI.projects.changePosition(currentId, afterId, beforeId);
      },
      animation: 200,
    });
  });
</script>

<ProjectsWrapper {projects} {isAdmin} {children} bind:rootRef />
