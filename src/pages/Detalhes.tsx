import { useEffect, useState } from "react";
import { useParams } from "react-router";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Detalhes() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function fetchDetalhes() {
            try {
                const resposta = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
                );

                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status}`);
                }

                const dados = await resposta.json();
                setFilme(dados);
            } catch (error) {
                console.log(error);
                setErro("Erro ao buscar detalhes do filme");
            } finally {
                setLoading(false);
            }
        }

        fetchDetalhes();
    }, [id]);

    if (loading) {
        return <p className="text-center mt-10 text-neutral-400">Carregando detalhes...</p>
    }

    if (erro) {
        return <p className="text-center mt-10 text-red-400">{erro}</p>
    }

    if (!filme) {
        return <p className="text-center mt-10 text-neutral-400">Filme não encontrado</p>
    }

    const poster = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : null;

    return (
        <article className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
                {poster ? (
                    <img
                        src={poster}
                        alt={filme.title}
                        className="w-full rounded-lg shadow-xl"
                    />
                ) : (
                    <div className="bg-neutral-800 rounded-lg p-10 text-center text-neutral-500">
                        Sem poster
                    </div>
                )}
            </div>

            <div className="md:w-2/3">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-3xl font-bold">{filme.title}</h1>
                    <span className="bg-neutral-800 px-2 py-1 rounded text-sm">
                        {filme.release_date}
                    </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <span className="text-xl text-yellow-400">⭐ {filme.vote_average.toFixed(1)}</span>
                    <span className="text-sm">• {filme.vote_count} votos</span>
                </div>

                <p className="text-neutral-300 mb-6 leading-relaxed">
                    {filme.overview}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-semibold">Duração</p>
                        <p>{filme.runtime} min</p>
                    </div>
                    <div>
                        <p className="font-semibold">Orçamento</p>
                        <p>
                            {filme.budget
                                ? `$${filme.budget.toLocaleString()}`
                                : "Não informado"}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}