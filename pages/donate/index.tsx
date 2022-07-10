import DonateStyles from '/styles/donate/index.module.scss'
import UsefullStyles from '/styles/usefull.module.scss'
import Head from 'next/head'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>Donate me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div id={UsefullStyles.content_centered}>
      <a className={DonateStyles.back} href="/">Назад</a>
      <h1 className={DonateStyles.case_name}>Donate</h1>
      <p>
        <a className={DonateStyles.links} href="/donate/crypto">crypto </a>
        |
        <a className={DonateStyles.links} href="/donate/ecash"> ecash </a>
      </p>
    </div>
  </div>

  );
  