import { Avatar } from './Avatar';
import styles from './Sidebar.module.css'
import { PencilLine } from 'phosphor-react';

export function Sidebar() {
    return <aside className={styles.sidebar}>
        <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
        alt=""
      />
      <div className={styles.profile}>
        {/* <img className={styles.avatar} src="https://github.com/caioms2000.png" alt="" /> */}
        <Avatar src="https://github.com/caioms2000.png" />
        <strong>Diego Fernandes</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="/"> <PencilLine size={20} /> Editar perfil</a>
      </footer>
    </aside>
}
