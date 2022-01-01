import DonateStyles from '/styles/donate/index.module.scss'
import UsefullStyles from '/styles/usefull.module.scss'
import Head from 'next/head'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>Donate ecash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={DonateStyles.main_case} id={UsefullStyles.content_centered_flex}>
      <a className={DonateStyles.back} href="/donate">Назад</a>
      <h1 className={DonateStyles.case_name}>Ecash</h1>
      <div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>QIWI/Card:</span>
          <a href={"https://qiwi.com/n/ILYHALIGHT"} className={DonateStyles.address}>https://qiwi.com/n/ILYHALIGHT</a>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>YooMoney/Card:</span>
          <a href={"https://yoomoney.ru/to/410018063704641"} className={DonateStyles.address}>https://yoomoney.ru/to/410018063704641</a>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>Payeer:</span>
          <span className={DonateStyles.address}>P1014846551</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>AdvCash Rub:</span>
          <span className={DonateStyles.address}>R 2674 8679 7534</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>AdvCash Eur:</span>
          <span className={DonateStyles.address}>E 8480 6521 8974</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>AdvCash Usd:</span>
          <span className={DonateStyles.address}>U 8403 3058 6546</span>
        </div>
      </div>
    </div>
  </div>

  );
  