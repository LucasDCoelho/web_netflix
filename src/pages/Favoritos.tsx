import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import type { Filme } from "../types";

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState<Filme[]>([]);

    useEffect(() => {
        const salvos = JSON.parse(localStorage.getItem("filmes-favoritos") || "[]");
        setFavoritos(salvos);
    }, []);

    function removerFavorito(id: number) {
        const novos = favoritos.filter((f) => f.id !== id);
        setFavoritos(novos);
        localStorage.setItem("filmes-favoritos", JSON.stringify(novos));
    }

    return (
        <section>
            <h1 className="text-2xl font-bold mb-6">Meus favoritos</h1>

            {favoritos.length === 0 && (
                <p className="text-neutral-400">Nenhum filme favoritado.</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favoritos.map((filme) => (
                    <div key={filme.id} className="relative group">
                        <MovieCard
                            key={filme.id}
                            filme={filme}
                            favorito={true}
                            onAlternarFavorito={() => removerFavorito(filme.id)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}