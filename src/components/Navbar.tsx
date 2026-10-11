import { NavLink } from "react-router"

const classeLink = ({ isActive }: { isActive: boolean }) =>
    `pb-1 transition-colors ${isActive
        ? 'text-yellow-400 font-semibold border-b-2 border-yellow-400'
        : 'text-neutral-400 hover:text-neutral-100'
    }`

export default function Navbar() {
    return (
        <header className="bg-neutral-900 px-6 py-4 flex items-center justify-between">
            <span className="text-xl font-bold">🎬 CineCatálogo</span>
            <nav className="flex gap-6">
                <NavLink to="/" end className={classeLink}>Início</NavLink>
                <NavLink to="/busca" className={classeLink}>Buscar</NavLink>
                <NavLink to="/favoritos" className={classeLink}>Favoritos</NavLink>
            </nav>
        </header>
    )
}