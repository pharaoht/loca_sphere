'use client'
import Image from 'next/image';
import styles from './login.module.css';
import { useActionState } from "react";

const url = process.env.NEXT_PUBLIC_ENV === 'dev' ? 'http://localhost:8000/api/auth/google' : `${process.env.NEXT_PUBLIC_PROD_DOMAIN}/api/auth/google`

const Page = () => {

    const [ state, action, pending ] = useActionState(loginAction, undefined);

    function loginAction(){
        
        window.location.href = url
    }

    return (
        <main className={styles.pageContainer}>
            <section className={styles.loginContainer}>
                <figure className={styles.imageContainer}>
                    <Image src='/photo.jpg' alt='login image' fill/>
                </figure>

                <section className={styles.loginOptions}>
                    <h1 className={styles.headerText}>Login <br></br> or <br></br> Sign up with Google</h1>
                    
                    <button onClick={loginAction} type='button'>Go to Google</button>
                    
                </section>
            </section>
        </main>
    )
}

export default Page;