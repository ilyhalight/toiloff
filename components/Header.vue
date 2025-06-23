<script setup>
  import DropDownLocales from '~/components/DropDowns/DropDownLocales.vue';
  import ThemesButton from '~/components/Buttons/ThemesButton.vue';
  import HeaderMenu from '~/components/Menus/HeaderMenu.vue';
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="logo">
      {{ '<' }}<span>Toiloff</span>/>
    </NuxtLink>
    <nav class="navbar">
      <NuxtLink class="navbar-item" to="/about"> {{ $t('pages.about') }} </NuxtLink>
      <NuxtLink class="navbar-item" to="/donate"> {{ $t('pages.donate') }} </NuxtLink>
      <NuxtLink class="navbar-item" to="/social"> {{ $t('pages.social') }} </NuxtLink>
    </nav>
    <div class="navbar">
      <themes-button class="navbar-item" />
      <drop-down-locales class="navbar-item" />
    </div>
    <HeaderMenu/>
  </header>
</template>