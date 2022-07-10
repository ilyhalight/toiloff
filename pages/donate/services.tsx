import DonateStyles from '/styles/donate/index.module.scss'
import UsefullStyles from '/styles/usefull.module.scss'
import Head from 'next/head'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>Donate services</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={DonateStyles.main_case} id={UsefullStyles.content_centered_flex}>
      <a className={DonateStyles.back} href="/donate">Назад</a>
      <h1 className={DonateStyles.case_name}>Donation services</h1>
      <div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>DonationAlerts: *BLOCKED*</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>DonatePay: *BLOCKED*</span>
        </div>
      </div>
    </div>
  </div>

  );
  