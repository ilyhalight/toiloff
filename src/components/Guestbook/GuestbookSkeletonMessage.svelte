<script lang="ts">
  let { hidden = false }: { hidden?: boolean } = $props();
</script>

<div class="guestbook-skeleton" {hidden}>
  <span class="guestbook-skeleton__card"></span>
  <span class="guestbook-skeleton__card"></span>
</div>

<style>
  .guestbook-skeleton {
    display: grid;
    gap: 1rem;
  }

  .guestbook-skeleton[hidden] {
    display: none;
  }

  .guestbook-skeleton__card {
    min-height: 8.5rem;
    border-radius: 1rem;
    background: linear-gradient(
      90deg,
      var(--surface-bg),
      var(--onsurface-bg),
      var(--surface-bg)
    );
    background-size: 220% 100%;
    animation: guestbook-loading 1.1s ease-in-out infinite;
  }

  @keyframes guestbook-loading {
    from {
      background-position: 100% 0;
    }

    to {
      background-position: -100% 0;
    }
  }
</style>
