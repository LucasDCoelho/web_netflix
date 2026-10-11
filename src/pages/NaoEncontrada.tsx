import { Link } from "react-router";


export default function NaoEncontrada() {
    return (
        <div>
            <h1>Página não encontrada</h1>
            <p>
                <Link to="/">Voltar para a página inicial</Link>
            </p>
        </div>
    );
}