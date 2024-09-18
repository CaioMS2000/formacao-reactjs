import { Post } from './components/Post'
import { Header } from './components/header'
import './global.css'
import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'

function App() {
    return (
        <>
            <Header></Header>
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    <Post />
                </main>
            </div>
        </>
    )
}

export default App
