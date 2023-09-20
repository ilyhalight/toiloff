<script setup>
  import Menu from '~/components/Menus/Menu.vue';
  import ThemesButton from '~/components/Buttons/ThemesButton.vue';
  import LocalesMenu from '~/components/Menus/LocalesMenu.vue';
</script>

<template>
  <Menu>
    <template #icon>
      <Icon class="big-icon" name="gg:menu" />
    </template>
    <template #content>
      <NuxtLink class="menu-item" to="/about"> {{ $t('pages.about') }} </NuxtLink>
      <NuxtLink class="menu-item" to="/donate"> {{ $t('pages.donate') }} </NuxtLink>
      <NuxtLink class="menu-item" to="/social"> {{ $t('pages.social') }} </NuxtLink>
      <a class="menu-item" href="https://akibot.ru">Aki</a>
      <themes-button class="menu-item" />
      <locales-menu class="menu-item" />
    </template>
  </Menu>
</template>