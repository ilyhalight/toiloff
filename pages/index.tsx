import Head from 'next/head'
import UsefullStyles from '/styles/usefull.module.scss'
import GeneralStyles from '/styles/general.module.scss'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>Toiloff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div id={UsefullStyles.content_centered}>
      <h1 className={GeneralStyles.case_name}>Toiloff</h1>
      <p>
        <a className={GeneralStyles.links} href="/donate">donate </a>
        |
        <a className={GeneralStyles.links} href="/social"> social </a>
        |
        <a className={GeneralStyles.links} href="https://fame-community.ru" target={"_blank"}> servers </a>
        |
        <a className={GeneralStyles.links} href="/about"> about</a>
      </p>
    </div>
  </div>

  );
  
