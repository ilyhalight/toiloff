import SocialStyles from '/styles/social/index.module.scss'
import UsefullStyles from '/styles/usefull.module.scss'
import Head from 'next/head'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>Social</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div id={UsefullStyles.content_centered}>
      <a className={SocialStyles.back} href="/">Назад</a>
      <h1 className={SocialStyles.case_name}>Networks</h1>
      <p className={SocialStyles.array}>
        <a className={SocialStyles.links} href="https://vk.com/toilofficial">vk </a>
        |
        <a className={SocialStyles.links} href="#" onClick={() => {prompt('copy', 'Toil#8997');}}> ds </a>
        |
        <a className={SocialStyles.links} href="https://t.me/ToilOfficial"> tg</a>
      </p>
      <h1 className={SocialStyles.case_name}>Forums</h1>
      <p className={SocialStyles.array}>
        <a className={SocialStyles.links} href="https://lolz.guru/toil">lolz </a>
        |
        <a className={SocialStyles.links} href="https://yougame.biz/members/205775/"> yougame </a>
        |
        <a className={SocialStyles.links} href="https://hlmod.ru/members/toil.141276/"> hlmod</a>
      </p>
      <h1 className={SocialStyles.case_name}>Games</h1>
      <p className={SocialStyles.array}>
        <a className={SocialStyles.links} href="https://steamcommunity.com/id/ToilOfficial">steam </a>
        |
        <a className={SocialStyles.links} href="https://www.gog.com/u/ilyhalight"> gog </a>
        |
        <a className={SocialStyles.links} href="https://account.xbox.com/ru-ru/profile?gamertag=Toil3204"> xbox </a>
        |
        <a className={SocialStyles.links} href="https://www.origin.com/rus/ru-ru/profile/user/Us_m7_zkAXm4u_A4yP5DQA--/achievements"> origin (for authorized)</a>
      </p>
      <h1 className={SocialStyles.case_name}>Anime & Manga & Etc</h1>
      <p className={SocialStyles.array}>
        <a className={SocialStyles.links} href="https://shikimori.one/Toil">shikimori </a>
        |
        <a className={SocialStyles.links} href="https://mangalib.me/user/679978"> mangalib </a>
        |
        <a className={SocialStyles.links} href="https://mangadex.org/user/b9f770ef-cc80-4b07-b9b0-8561837eda70"> mangadex</a>
      </p>
      <h1 className={SocialStyles.case_name}>Other</h1>
      <p className={SocialStyles.array}>
        <a className={SocialStyles.links} href="https://github.com/ilyhalight">gh </a>
        |
        <a className={SocialStyles.links} href="mailto:admin@toiloff.ru"> mail</a>
      </p>
    </div>
  </div>

  );
  