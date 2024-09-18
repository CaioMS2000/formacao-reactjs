import { Post } from './components/Post'
import { Header } from './components/header'
import './global.css'
import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'

const posts = [
    {
        id: 1,
        author: {
            avatarUrl: 'https://github.com/caioms2000.png',
            name: 'Caio',
            role: 'Web Developer',
        },
        content: [
            { type: 'paragraph', content: 'Fala galeraa 👋' },
            {
                type: 'paragraph',
                content:
                    'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
            },
            { type: 'link', content: 'jane.design/doctorcare' },
        ],
        publishedAt: new Date('2022-05-03 20:00:00'),
    },
    {
        id: 2,
        author: {
            avatarUrl: 'https://github.com/diego3g.png',
            name: 'Diego Fernandes',
            role: 'CTO @Rocketseat',
        },
        content: [
            { type: 'paragraph', content: 'E aí, pessoal! 🚀' },
            {
                type: 'paragraph',
                content:
                    'Acabei de lançar um novo vídeo no canal da Rocketseat. Nele, eu mostro como criar uma aplicação completa do zero usando as tecnologias mais modernas do mercado.',
            },
            { type: 'link', content: 'rocketseat.com.br/novidades' },
        ],
        publishedAt: new Date('2023-06-10 15:30:00'),
    },
]

function App() {
    return (
        <>
            <Header></Header>
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    {posts.map((post) => {
                        return (
                            <Post
                                key={post.id}
                                author={post.author}
                                content={post.content}
                                publishedAt={post.publishedAt}
                            />
                        )
                    })}
                </main>
            </div>
        </>
    )
}

export default App
