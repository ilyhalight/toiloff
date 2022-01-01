import Head from 'next/head'
import UsefullStyles from '/styles/usefull.module.scss'
import AboutStyles from '/styles/general.module.scss'

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
        <h4 className="years">Years:
            <span> 16 y.o.</span>
        </h4>
        <h4 className="city">City:
            <span> Voronezh</span>
        </h4>
        <h4 className="programming_languages">Programming Languages:
            <ol>
                <h5 className="python">Python (Mostly Discordpy, little PyQT5)</h5>
                <h5 className="javascript">JavaScript (Next, Nest, little TypeScript)</h5>
            </ol>

        </h4>
        <h4 className="databases">Databases:
            <ol>
                <h5 className="mysql">MySQL</h5>
                <h5 className="mongodb_postgress">little MongoDB and PostgreSQL</h5>
            </ol>
        </h4>
        <h4 className="databases">Open Source Projects:
          <a className={AboutStyles.links} href='https://github.com/ilyhalight/Aki-DiscordBot' target={'_blank'}> Aki-DiscordBot</a>
        </h4>
        <h4 className="best_discord">Best discord server:
            <a className={AboutStyles.links} href='https://discord.gg/famesrv' target={'_blank'}> discord.gg/famesrv</a>
        </h4>
      </div>

    </div>
  </div>

  );
  
