<script lang="ts">
  import AdminActions, { type Link } from "./AdminActions.svelte";

  const links: Link[] = [
    {
      title: "Create",
      href: "/admin/projects/create",
    },
  ];
</script>

<AdminActions title="Actions" {links} />

<h1>helo</h1>
