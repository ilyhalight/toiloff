<script setup>
  import DropDownLocales from './DropDowns/DropDownLocales.vue';
  import ThemesButton from './Buttons/ThemesButton.vue';
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="logo">
      {{ '</' }}<span>ToilDev</span>>
    </NuxtLink>
    <nav class="navbar">
      <NuxtLink class="navbar-item" to="/about"> {{ $t('About me') }} </NuxtLink>
      <NuxtLink class="navbar-item" to="/donate"> {{ $t('Donate') }} </NuxtLink>
      <NuxtLink class="navbar-item" to="/blog"> {{ $t('Blog') }} </NuxtLink>
      <NuxtLink class="navbar-item" to="/social"> {{ $t('Social') }} </NuxtLink>
    </nav>
    <div class="navbar">
      <themes-button class="navbar-item" />
      <drop-down-locales class="navbar-item" />
    </div>
  </header>
</template>