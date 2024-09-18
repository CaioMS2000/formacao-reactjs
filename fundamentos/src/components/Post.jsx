import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

export function Post() {
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    {/* <img
                        src="https://github.com/caioms2000.png"
                        alt=""
                        className={styles.avatar}
                    /> */}
                    <Avatar src="https://github.com/caioms2000.png" />
                    <div className={styles.authorInfo}>
                        <strong>Diego Fernandes</strong>
                        <span>Web Developer</span>
                    </div>
                </div>

                <time
                    title="05 de março as 08:11"
                    dateTime="2022/05/11 08:11:05"
                >
                    Publicado há 1h
                </time>
            </header>

            <div className={styles.content}></div>

            <form className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea placeholder="Deixe um comentário" />
                <footer>
                    <button type="submit">Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                <Comment />
            </div>
        </article>
    )
}
