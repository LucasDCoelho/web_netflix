import { Link } from "react-router"
import type { Filme } from "../types";

interface MovieCardProps {
    filme: Filme;
    favorito?: boolean;
    onAlternarFavorito?: () => void;
}

export default function MovieCard({ filme, favorito, onAlternarFavorito }: MovieCardProps) {

    const poster = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : null

    return (
        <article className="relative bg-neutral-900 rounded-lg overflow-hidden">
            {onAlternarFavorito && (
                <button
                    onClick={onAlternarFavorito}
                    className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-2 hover:bg-black/80"
                    title={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                    {favorito ? "❤️" : "🤍"}
                </button>
            )}
            <Link to={`/filmes/${filme.id}`}>
                {poster ? (
                    <img src={poster} alt={`Pôster de ${filme.title}`} className="w-full aspect-2/3 object-cover" />
                ) : (
                    <div className="w-full aspect-2/3 flex items-center justify-center text-neutral-500">
                        Sem imagem
                    </div>
                )}
                <div className="p-3">
                    <h2 className="font-semibold leading-tight">{filme.title}</h2>
                    <p className="text-sm text-yellow-400 mt-1">⭐ {filme.vote_average.toFixed(1)}</p>
                </div>
            </Link>
        </article>


    )
}