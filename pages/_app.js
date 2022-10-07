
import Layout from '../components/layout';
import PageProvider from '../components/pageContext';
import AuthProvdier from '../components/authContext';
import '../styles/globals.css';



function MyApp({ Component, pageProps }) {
  return (
    
      <AuthProvdier>
      <PageProvider>   
        <Layout>
          <Component {...pageProps} />
        </Layout>     
      </PageProvider>
      </AuthProvdier>
    
      
      
        
      
  )
}

export default MyApp
