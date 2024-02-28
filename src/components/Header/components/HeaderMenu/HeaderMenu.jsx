import styles from "./HeaderMenu.module.scss";
function HeaderMenu({setPage}) {
    return (
        <ul className={`${styles.MenuContainer} card p-20`}>
            <li onClick={() => setPage('admin')}>Ajouter une recette</li>
            <li>Wishlist</li>
            <li>Connexion</li>

        </ul>
    );
}

export default HeaderMenu;