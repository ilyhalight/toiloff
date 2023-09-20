<script setup>
  import config from '~/config/config.js';
  import getTitle from '~/utils/title.js';
  import socials from "~/data/socials.json";

  const route = useRoute();
  const { t, locales } = useI18n();

  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true
  });

  const title = computed(() => getTitle(t(route.meta.title ?? 'layouts.main')));
  useSeoMeta({
    title: title,
    ogTitle: title,
    description: config.siteDesc,
    ogDescription: config.siteDesc,
  });

  const sameAs = computed(() => {
    let sameArray = [];
    for (const social of Object.entries(socials)) {
      const socialArray = social[1].map(s => s.href);
      sameArray = sameArray.concat(socialArray);
    }
    return sameArray;
  });

  useSchemaOrg([
    definePerson({
      name: config.personName,
      image: '/images/me.jpg',
      sameAs: sameAs.value
    }),
    defineWebSite({
      url: config.baseUrl,
      name: config.siteName,
      description: config.siteDesc,
      inLanguage: locales.value.map(locale => locale.iso)
    }),
    defineWebPage({
      name: title
    }),
  ]);

  defineOgImage({
    siteName: config.siteName
  });
</script>


<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <Header/>
      <!-- <SchemaOrgDebug /> -->
      <slot />
      <Footer/>
    </Body>
  </Html>
</template>