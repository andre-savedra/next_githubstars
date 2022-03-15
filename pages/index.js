import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Image from "next/image";
import Validation from "../components/Validation";

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Página Home SWAPI</title>
      </Head>

      <div
        className={
          styles.logoPanel + " flex align-items-center justify-content-center"
        }
      >
        
          <div className={styles.stars1}></div>
          <div className={styles.stars2}></div>
          <div className={styles.stars3}></div>
        
        <Image
          src="/image/githubstars.png"
          alt="Star Wars Image"
          width="370px"
          height="250px"
        />
      </div>

      <div
        className={
          styles.contentPanel +
          " flex align-items-center justify-content-center"
        }
      >
        <Validation></Validation>
      </div>
    </div>
  );
}
