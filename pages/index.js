import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
   const router=useRouter()
 
  useEffect(()=>{
    router.push('/topstories')
  },[])
  return (

    <div className={styles.container}>
      <Head>
        <title>Google News</title>
        <meta name='description' content='google news clone by wai'/>
        <link rel='icon' href='/Google_news_logo.png'/>
      </Head>
      
    </div>
  )
}
