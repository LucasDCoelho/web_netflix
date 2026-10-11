import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const CHAVE = "filmes-favoritos";


export default function Buscar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const [favoritos, setFavoritos] = useState(
        () => JSON.parse(localStorage.getItem(CHAVE) || "[]")
    );

    useEffect(() => {
        async function fetchBusca() {
            if (!query) {
                setFilmes([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setErro("");
                const resposta = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
                );

                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status}`);
                }

                const dados = await resposta.json();
                setFilmes(dados.results);
            } catch (error) {
                console.log(error);
                setErro("Erro ao buscar filmes");
            } finally {
                setLoading(false);
            }
        }

        fetchBusca();
    }, [query]);

    useEffect(() => {
        localStorage.setItem(CHAVE, JSON.stringify(favoritos));
    }, [favoritos]);

    function alternarFavorito(filme) {
        setFavoritos((atuais) =>
            atuais.some((f) => f.id === filme.id)
                ? atuais.filter((f) => f.id !== filme.id)
                : [...atuais, filme]

        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        const texto = event.target.query.value;
        setSearchParams({ q: texto });
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    name="query"
                    defaultValue={query}
                    placeholder="Digite o nome do filme..."
                    className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 focus:border-blue-500 outline-none"
                />
            </form>

            {loading && <p className="text-neutral-400">Buscando...</p>}
            {erro && <p className="text-red-400">{erro}</p>}

            {!loading && !erro && (
                <>
                    {query && filmes.length === 0 && (
                        <p className="text-neutral-400">Nenhum filme encontrado para "{query}"</p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filmes.map((filme) => (
                            <MovieCard
                                key={filme.id}
                                filme={filme}
                                favorito={favoritos.some((f) => f.id === filme.id)}
                                onAlternarFavorito={() => alternarFavorito(filme)}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}