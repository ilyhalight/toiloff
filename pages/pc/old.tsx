import Head from 'next/head'
import UsefullStyles from '/styles/usefull.module.scss'
import AboutStyles from '/styles/general.module.scss'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>Old PC specs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div id={UsefullStyles.content_centered_flex}>
      <a className={AboutStyles.back} href="/">Назад</a>
      <a className={AboutStyles.back} href="/pc">  Actual PC</a>
      <h1 className={AboutStyles.case_name}>Old PC specs</h1>
      <div>
        <h4 className="cpu">CPU:
            <span> I5 4440 3.2GHz</span>
        </h4>
        <h4 className="mb">Motherboard:
            <span> Lenovo CIB85M</span>
        </h4>
        <h4 className="gpu">GPU:
            <span> Palit GTX 1070 Dual OC</span>
        </h4>
        <h4 className="ram">RAM:
            <span> Kllisre 8GB 1600MHz</span>
            <span> + KANMEIQi 8GB 1866MHz</span>
        </h4>
        <h4 className="ssd">SSD:
            <span> WD GREEN 240 GB</span>
        </h4>
        <h4 className="psu">PSU:
            <span> HIPER M550 600W</span>
        </h4>
        <h4 className="hdd">HDD 1:
            <span> Hitachi HUA 1 TB</span>
        </h4>
        <h4 className="hdd">HDD 2:
            <span> Seagate Barracuda 2 TB</span>
        </h4>
      </div>
      <h1 className={AboutStyles.case_name}>Old PC tests</h1>
      <h5>i5 4440 & 1070 & 16 GB RAM & Win10</h5>
      <div>
        <h4 className="farcry_newdown">Far Cry New Dawn:
            <span> 59 FPS | Maximum (Сглаживание: TAA)</span>
        </h4>
        <h4 className="farcry5">Far Cry 5:
            <span> 74 FPS | Maximum (Сглаживание: TAA)</span>
        </h4>
        <h4 className="ashes_singularity">Ashes of the Singularity: Escalation:
            <span> 40 FPS | Crazy (8x MSAA + dx12 | GPU FOCUS)</span>
        </h4>
        <h4 className="pubg">PUBG:
            <span> +-70 FPS | Ultra</span>
        </h4>
        <h4 className="satisfactory">Satisfactory (base lvl - 4):
            <span> 70 FPS | Ultra</span>
        </h4>
        <h4 className="cyberpunk">Cyberpunk2077 (ver 1.03):
            <span> 45 FPS | High (RTX:OFF | DLSS:OFF | AF:8x)</span>
        </h4>
        <h4 className="rust">Rust:
            <span> 55 FPS | Ultra (DLSS: OFF, сглаживание: FXAA)</span>
        </h4>
      </div>
    </div>
  </div>

  );
  
