import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";

async function getData(id: string) {
    const postResponse = await fetch(`https://my-json-server.typicode.com/typicode/demo/posts/${id}`,
        {
            next: {
                revalidate:60
            },
        }
    );
    const postData = await postResponse.json();
  
    const commentsResponse = await fetch(`https://my-json-server.typicode.com/typicode/demo/comments/${id}`,
        {
            next: {
                revalidate:60
            },
        }
    );
    const commentsData = await commentsResponse.json();
  
    // Объединение данных поста и комментариев в один объект
    const data = { post: postData, comments: commentsData };
  
    return data;
  }
type Props = {
    params: {
        id: string;
    }
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
    const data = await getData(id);
    return {
      title: data.post.title,
    };
  }

export default async function Post({ params: { id } }: Props) {
    const data = await getData(id);
  
    return (
      <>
      <div className={styles.post__inside}>
        <h1 className="dinam">{data.post.title}</h1>
        <p>{data.comments.body}</p>
        <Link href='/blog'>Вернуться к просмотру</Link>
      </div>
      </>
    );
  }