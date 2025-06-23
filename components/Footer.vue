<script setup>
  const { t } = useI18n();

</script>

<template>
  <footer class="footer">
    <div class="footer-creds">
      <p>{{ $t("footer.made_with_love") }}</p>
      <NuxtLink to="/">Toil</NuxtLink>
    </div>
  </footer>
</template>

<style>
  .footer-creds {
    display: flex;
    align-items: center;
  }
</style>