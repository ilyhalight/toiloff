import Head from 'next/head'
import UsefullStyles from '/styles/usefull.module.scss'
import GeneralStyles from '/styles/general.module.scss'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>Aki-DiscordBot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div id={UsefullStyles.content_centered}>
      <a className={GeneralStyles.back} href="/">Назад</a>
      <h1 className={GeneralStyles.case_name}>Aki-DiscordBot</h1>
      <p>
        <a className={GeneralStyles.links} href="https://discord.com/api/oauth2/authorize?client_id=722197932916473876&permissions=8&scope=bot%20applications.commands">invite </a>
        |
        <a className={GeneralStyles.links} href="https://github.com/ilyhalight/Aki-DiscordBot"> gh (old version)</a>
      </p>
    </div>
  </div>

  );
  
