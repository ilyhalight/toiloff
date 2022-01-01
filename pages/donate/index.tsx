import DonateStyles from '/styles/donate/index.module.scss'
import UsefullStyles from '/styles/usefull.module.scss'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
    <div className={DonateStyles.main_case} id={UsefullStyles.content_centered}>
      <h1 className={DonateStyles.case_name}>Crypto</h1>
      <div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>btc (bc1):</span>
          <span className={DonateStyles.address}>bc1qhf5m20quykgz0h26rf9s65fwjfr8m5tnvrdcfw</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>btc (от 0.0005):</span>
          <span className={DonateStyles.address}>3MrzB6xruve8jSGjDrrYRPtpM4LBJfK7vi</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>eth:</span>
          <span className={DonateStyles.address}>0x15Fa5b9761a9a7181F80f1A2AF4C1d72Bb3E4466</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>xrp:</span>
          <span className={DonateStyles.address}>rBpUZBdZCJoymL5VYXphGQhjqGE5Hgh3g8</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>bnb:</span>
          <span className={DonateStyles.address}>bnb1cgg40a34tcpfmzm8mdktc2n9acyqttukcf9792</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>etc (Ethereum Classic):</span>
          <span className={DonateStyles.address}>0x74B93D70767Ac47E3c8549827ef8a9E627737BF2</span>
        </div>
        <div className={DonateStyles.case}>
          <span className={DonateStyles.option}>doge:</span>
          <span className={DonateStyles.address}>DTaebDEz1pQ4SPnjnhNcr3C8672keZyEJY</span>
        </div>
      </div>
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
      </div>
    </div>
  </div>

  );
  