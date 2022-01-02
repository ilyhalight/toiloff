import Head from 'next/head'
import UsefullStyles from '/styles/usefull.module.scss'
import AboutStyles from '/styles/general.module.scss'

export default () => (
  <div className="div" id={UsefullStyles.overlay}>
      <Head>
        <title>PC specs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div id={UsefullStyles.content_centered_flex}>
      <a className={AboutStyles.back} href="/">Назад</a>
      <a className={AboutStyles.back} href="/pc/old">  Old PC</a>
      <h1 className={AboutStyles.case_name}>PC specs</h1>
      <div>
        <h4 className="cpu">CPU:
            <span> Ryzen 7 3700 PRO 4.2GHz</span>
        </h4>
        <h4 className="mb">Motherboard:
            <span> MSI B450M MORTAR MAX</span>
        </h4>
        <h4 className="gpu">GPU:
            <span> Palit GTX 1070 Dual OC</span>
        </h4>
        <h4 className="ram">RAM:
            <span> HyperX 16 GB 2400MHz (2x8)</span>
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

      <h1 className={AboutStyles.case_name}>PC tests</h1>
      <h5>Ryzen 3700 & 1070 & 16GB RAM & Win11</h5>
      <div>
        <h4 className="farcry_newdown">Far Cry New Dawn:
            <span> 80 FPS | Maximum (Сглаживание: TAA)</span>
        </h4>
        <h4 className="farcry5">Far Cry 5:
            <span> 95 FPS | Maximum (Сглаживание: TAA)</span>
        </h4>
        <h4 className="ashes_singularity">Ashes of the Singularity: Escalation:
            <span> 50 FPS | Crazy (8x MSAA + dx12 | GPU FOCUS)</span>
        </h4>
        <h4 className="satisfactory">Satisfactory (base lvl - 1):
            <span> 150 FPS | Ultra</span>
        </h4>
        <h4 className="cyberpunk1.03">Cyberpunk2077 (ver 1.03):
            <span> 53 FPS | High (RTX:OFF | DLSS:OFF | AF:8x)</span>
        </h4>
        <h4 className="cyberpunk1.31">Cyberpunk2077 (ver 1.31):
            <span> 48 FPS | High (RTX:OFF | DLSS:OFF | AF:8x)</span>
        </h4>
        <h4 className="rust">Rust (Barren):
            <span> 76 FPS | Ultra (DLSS: OFF, сглаживание: FXAA)</span>
        </h4>
      </div>
    </div>
  </div>

  );
  
