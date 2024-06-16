import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";

interface Post {
  id: number;
  title: string;
}

interface BlogProps {
  query?: {
    page?: string;
  };
}

async function getData(page: number) {
  const response = await fetch(
    `https://my-json-server.typicode.com/typicode/demo/posts?_page=${page}&_limit=10`
  );
  return response.json();
}

export const metadata: Metadata = {
  title: "Блог | Next App",
};

export default async function Blog({ query }: BlogProps) {
  const page = query?.page ? parseInt(query.page) : 1;
  const posts: Post[] = await getData(page);

  return (
    <>
      <div className={styles.blog__container}>
        <div className={styles.blog__container__content}>
          <h1 className="blog">Посты</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.blog__container__btns}>
          <Link legacyBehavior href={`/blog?page=${page - 1}`}>
            <a>назад</a>
          </Link>
          <Link legacyBehavior href={`/blog?page=${page + 1}`}>
            <a>далее</a>
          </Link>
        </div>
      </div>
    </>
  );
}
