import { useSelector } from "react-redux";

const Home = () => {
    const theme  = useSelector(state => state.ui.theme)

    return(
        <main style={{
            padding: "40px",
            minHeight: "60px",
            background: theme === "light"? "#fff": "#222",
            color: theme === 'light' ? "#000": "#fff"
        }}>

            <h2>Информация</h2>
            <p>ФИО: Казакова Айдай Автандиловна</p>
            <p>Возраст: 19 лет</p>
            <p>Статус: Студент</p>

        </main>
    )
}

export default Home