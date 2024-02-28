import styles from "./Header.module.scss";
import cookchef from "../../assets/images/cookchef.png";
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";

function Header({setPage}) {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className={`${styles.header} d-flex flex-row align-items-center`}>
            <div className="flex-fill">
                <img onClick={() => setPage('homepage')} src={ cookchef } alt="logo cookchef" />
            </div>
            <ul className={ styles.headerList}>
                <button onClick={() => setPage('admin')} className="btn btn-primary mr-15">
                    Ajouter une recette
                </button>
                <button className="mr-15 btn btn-reverse-primary">
                    <i className="fa-solid fa-heart mr-5"></i>
                    <span>Wishlist</span>
                </button>
                <button className="btn btn-primary">
                    connexion
                </button>
            </ul>
            <i onClick={() => setShowMenu(true)} className={`fa-solid fa-bars ${styles.headerXs}`}></i>
            { showMenu && (
            <>
            <div onClick={() => setShowMenu(false)} className="calc"></div>
            <HeaderMenu setPage={setPage} /> 
            </>
            )}
        </header>
    );
}

export default Header;