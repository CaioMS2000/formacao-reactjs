import { Avatar } from './Avatar'
import { Comment } from './Comment'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author {
    name: string
    role: string
    avatarUrl: string
}

interface Content {
    type: 'paragraph' | 'link'
    content: string
}

export interface PostType {
    id: number
    author: Author
    publishedAt: Date
    content: Content[]
}

interface PostProps{
    post: PostType
}

export function Post({ post:{author, content, publishedAt} }: PostProps) {
    const [comments, setComments] = useState([
        'esse post seu deu uma nice dick, valeu mano',
    ])
    const [newCommentText, setNewCommentText] = useState('')
    const publishedDateFormatted = format(
        publishedAt,
        "dd 'de' LLLL 'às' HH:mm'h'",
        { locale: ptBR }
    )
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(comment: string) {
        const commentsWithoutDeletedOne = comments.filter(c => c !== comment)
        setComments(commentsWithoutDeletedOne)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return (
                            <p key={line.content}>
                                <a href="/">{line.content}</a>
                            </p>
                        )
                    }
                })}
            </div>

            <form
                onSubmit={handleCreateNewComment}
                className={styles.commentForm}
            >
                <strong>Deixe seu feedback</strong>
                <textarea
                    required
                    placeholder="Deixe um comentário"
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    onInvalid={handleNewCommentInvalid}
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}
