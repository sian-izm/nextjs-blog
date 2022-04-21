import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import styles from './layout.module.css';
import useUser from '../lib/use-user';
import fetchJson from '../lib/fetch-json';
import { useRouter } from 'next/router';

export const siteTitle = 'Next.js Sample Website'

export default function Layout({
   children,
   home,
  }: {
    children: React.ReactNode
    home?: boolean
  }) {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  if (user?.isLoggedIn === true ) {
    var name = user.name;
  } else {
    var name = "Anonymous";
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {user?.isLoggedIn === true &&
          (home? (
            <>
              <Image
                priority
                src={user.avatarUrl}
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
            ) : (
            <>
              <Link href="/">
                <a>
                  <Image
                    priority
                    src={user.avatarUrl}
                    height={108}
                    width={108}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
            )
          )
        }
        { user === undefined && (
          <>
            <Link href="/login">
              <a>Login</a>
            </Link>
            <Link href="/account/register">
              <a>Register</a>
            </Link>
          </>
        )}

        {user?.isLoggedIn === true && (
          <>
            <Link href="/profile-sg">
              <a>
                <span
                  style={{
                    marginRight: ".3em",
                    verticalAlign: "middle",
                    borderRadius: "100%",
                    overflow: "hidden",
                  }}
                >
                </span>
                Profile (Static Generation, recommended)
              </a>
            </Link>
            <Link href="/profile-ssr">
              <a>Profile (Server-side Rendering)</a>
            </Link>
            {/* In this case, we're fine with linking with a regular a in case of no JavaScript */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/api/logout"
              onClick={async (e) => {
                e.preventDefault();
                mutateUser(
                  await fetchJson("/api/logout", { method: "POST" }),
                  false,
                );
                router.push("/login");
              }}
            >
              Logout
            </a>
          </>
        )}
      </header>

      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a> - Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
