import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const CHAVE = "filmes-favoritos";

export default function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const [favoritos, setFavoritos] = useState(
        () => JSON.parse(localStorage.getItem(CHAVE) || "[]")
    );

    useEffect(() => {
        async function fetchFilmes() {
            try {
                const resposta = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
                )
                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status} ao buscar os filmes`)
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
        fetchFilmes()
    }, []);

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

    if (loading) {
        return <p className="text-center mt-10 text-neutral-400">Carregando filmes...</p>
    }

    if (erro) {
        return <p className="text-center mt-10 text-red-400">{erro}</p>
    }

    return (
        <section>
            <h1 className="text-2xl font-bold mb-6">Filmes populares</h1>
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
        </section>
    );
}