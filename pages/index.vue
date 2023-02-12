<script setup>
  import MainSections from '~/components/Sections/MainSections.vue';

  import projects from "~/data/projects.json";
  import contributed from "~/data/contributed.json";

</script>

<template>
  <Header/>
  <main class="wrapper">
    <h1 class="text-attractive">
      {{ $t('Hello') }},
      <span class="text-gradient">{{ $t('I\'m Toil') }},</span>
      {{ $t('a developer from Russia') }}.
    </h1>
    <h2 class="subtext-attractive">
      {{ $t('On this site, you can find some information about me, my social networks, as well as about my projects') }}.
    </h2>
    <main-sections :items="projects">
      <h1 class="title">{{ $t('My OpenSource Projects') }}</h1>
      <p class="subtitle">{{ $t('A little below you can see some of my open source projects') }}.</p>
    </main-sections>
    <main-sections :items="contributed">
      <h1 class="title">{{ $t('Contributed') }}</h1>
      <p class="subtitle">{{ $t('A little below you can see the projects to which I have made any contribution') }}.</p>
    </main-sections>
    <!-- <p>{{ $t('Current locale') }}: {{ locale }}</p>
    <p>{{ $t('Current theme') }}: {{ $colorMode.value }}</p> -->
  </main>
</template>
