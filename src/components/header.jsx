import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import './header.css';

const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ui.theme);

    return (
        <header className={`header ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
            <div className="header-container">
                
                
                <a href="/" className="app-logo">
                    {/* <div className="logo-icon"></div> */}
                    <div>
                        <div className="app-name">KyrgyzRide</div>
                        <div className="app-slogan">Попутчики по Кыргызстану</div>
                    </div>
                </a>

                <nav className="nav-links">
                    <a href="/search" className="nav-link">Поиск поездок</a>
                    <a href="/trips" className="nav-link active"> Мои поездки</a>
                    <a href="/messages" className="nav-link">Сообщения</a>
                    <a href="/reviews" className="nav-link">Отзывы</a>
                    
                    <button className="create-ride-btn">
                        <span>+</span> Создать объявление
                    </button>
                </nav>

                
                <div className="user-actions">
                    <button 
                        className="theme-toggle"
                        onClick={() => dispatch(toggleTheme())}
                        title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    
                    <div className="user-profile">
                        <img 
                            src="https://avatars.mds.yandex.net/i?id=c4ad13ca274ba5765e9bf8b20b57e3b299026ccd-12629451-images-thumbs&n=13" 
                            alt="Айбек Ж." 
                            className="user-avatar"
                        />
                        <span className="user-name">Айбек Ж.</span>
                        <span style={{
                            fontSize: '12px',
                            background: 'rgba(255, 255, 255, 0.3)',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            marginLeft: '4px'
                        }}></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;