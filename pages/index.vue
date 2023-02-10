<script setup>
const { locale } = useI18n();
</script>

<template>
  <Header/>
  <main>
    <h1>{{ $t('Hello') }}</h1>
    <p>{{ $t('Welcome to my website') }}</p>
    <p>{{ $t('Current locale') }}: {{ locale }}</p>
    <p>{{ $t('Current theme') }}: {{ $colorMode.value }}</p>
  </main>
</template>
