import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100">
            <Navbar />
            <main className="max-w-6xl mx-auto p-6 pb-20">
                <Outlet />
            </main>
            <footer className="fixed bottom-0 inset-x-0 bg-neutral-900 py-3 text-center text-sm text-neutral-400">
                Catálogo de Filmes · dados do TMDb
            </footer>
        </div>
    )
}