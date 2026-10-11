import { Link } from "react-router";


export default function NaoEncontrada() {
    return (
        <section className="text-center mt-20">
            <h1 className="text-7xl font-bold text-yellow-400">404</h1>
            <p className="mt-4 text-lg text-neutral-300">Ops! Essa página não existe.</p>
            <Link
                to="/"
                className="inline-block mt-6 rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-neutral-900 hover:bg-yellow-300"
            >
                Voltar para a página inicial
            </Link>
        </section>
    )
}