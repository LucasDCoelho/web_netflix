import { Link } from "react-router"

export default function MovieCard({ filme }) {

    const poster = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : null

    return (
        <Link to={`/filmes/${filme.id}`}>
            <article className="bg-neutral-900 rounded-lg overflow-hidden">
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
            </article>

        </Link>

    )
}