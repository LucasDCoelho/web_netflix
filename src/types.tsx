export interface Filme {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
}


export interface FilmeDetalhes extends Filme {
    overview: string;
    release_date: string;
    vote_count: number;
    runtime: number;
    budget: number;
}