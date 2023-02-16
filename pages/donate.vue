<script setup>
  import DonateSection from '~/components/Sections/DonateSection.vue';
  import donate from "~/data/donate.json";
  
  useHead({
    title: "Донат · Toiloff",
    meta: [
      {
        name: "og:title",
        content: "Донат - Toiloff"
      },
    ]
  });
</script>

<template>
  <Header/>
  <main class="wrapper">
    <h1 class="text-attractive center">
      {{ $t('Donate') }}
    </h1>
    <h2 class="subtext-attractive center">
      {{ $t('On this page you can see a little information about the opportunity to donate to me') }}.
    </h2>
    <donate-section :items="donate"/>
  </main>
  <Footer/>
</template>
