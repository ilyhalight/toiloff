import Head from 'next/head'
import UsefullStyles from '/styles/usefull.module.scss'
import AboutStyles from '/styles/about/index.module.scss'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>About me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div id={UsefullStyles.content_centered}>
      <a className={AboutStyles.back} href="/">Назад</a>
      <h1 className={AboutStyles.case_name}>About me</h1>
      <div>
        <h4 className="city">City:
            <span> Voronezh</span>
        </h4>
        <h4 className="programming_languages">Programming Languages:
            <ol>
                <h5 className="python">Python (Mostly Discordpy (Switching to Disnake), little PyQT5)</h5>
                <h5 className="javascript">little JavaScript (Next, Nest, TypeScript)</h5>
                <h5 className="javascript">very very very very very little SourcePawn</h5>
            </ol>
        </h4>
        <h4 className="databases">Databases:
            <ol>
                <h5 className="mysql">MySQL</h5>
                <h5 className="mongodb_postgress">little MongoDB, SQLite and PostgreSQL</h5>
            </ol>
        </h4>
        <h4 className="databases">Open Source Projects:
          <a className={AboutStyles.links} href='https://github.com/ilyhalight/Aki-DiscordBot' target={'_blank'}> Aki-DiscordBot (old version)</a>
          <a className={AboutStyles.links} href='https://github.com/ilyhalight/voice-over-translation' target={'_blank'}> Voice-Over-Translation</a>
        </h4>
        <h4 className="listen_music">Where I listen music:
          <a className={AboutStyles.links} href='https://vk.com/toilofficial' target={'_blank'}> vk</a>
        </h4>
        <h4 className="best_discord">Best discord server:
            <a className={AboutStyles.links} href='https://discord.gg/RnxNZNXHSE' target={'_blank'}> discord.gg/RnxNZNXHSE</a>
        </h4>
      </div>

    </div>
  </div>

  );
  
