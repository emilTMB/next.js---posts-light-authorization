import Link from "next/link";

const Header = () => {
    return (
        <header className="container">
            <Link href='/authorization'>Авторизация</Link>
        </header>
    )
}
export {Header}