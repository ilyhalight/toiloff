<script setup>
  import MainSection from '~/components/Sections/MainSection.vue';
  import GradientEffect from '~/components/effects/GradientEffect.vue';

  import projects from "~/data/projects.json";

  import getTitle from '~/utils/title.js';

  const { t } = useI18n();
  const title = computed(() => getTitle(t('pages.index')));

  useSeoMeta({
    title: title,
    ogTitle: title,
  });

  useSchemaOrg([
    defineWebPage({
      name: title
    }),
  ]);
</script>

<template>
  <main class="wrapper">
    <div class="page-info">
      <gradient-effect>
        <template #elements>
          <div class="gradient-element" style="--opacity-delay: -8s; --move-delay: -3s;"></div>
          <div class="gradient-element" style="--opacity-delay: -0s; --move-delay: -17s; margin-left: 550px; margin-top: 150px; background: rgba(110, 41, 255, 0.7);"></div>
          <div class="gradient-element" style="--opacity-delay: -4s; --move-delay: -14s; margin-right: 550px; margin-top: 50px; background: rgba(220, 90, 91, 0.7);"></div>
        </template>
      </gradient-effect>
      <h1 class="text-attractive center">
        {{ $t('content.pages.index.title.part1') }} <span class="text-gradient">{{ $t('content.pages.index.title.highlighted') }}</span>
      </h1>
      <p class="subtext-attractive center">
        {{ $t('content.pages.index.desc') }}
      </p>
    </div>
    <main-section :items="projects">
      <template #title>
        <h2 class="title center">{{ $t('content.pages.index.projects.title') }}</h2>
      </template>
      <template #subtitle>
        <p class="subtitle center">{{ $t('content.pages.index.projects.desc') }}</p>
      </template>
    </main-section>
  </main>
</template>
