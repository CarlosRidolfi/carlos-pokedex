import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Pokemon = ({pokemon, index}) => {
    const [favorite, setFavorite] = React.useState(false)
    const pokeIndex = ('000' + (index + 1)).slice(-3)
    const pokemonInfo = [pokemon.name, pokeIndex]

    const favortieClick = () => {
        setFavorite(!favorite);
        localStorage.setItem("Pokemon " + pokeIndex, `{"name":"${pokemon.name}", "index":"${pokeIndex}"}`);
    }

    return (
        <div id='pokecontainer'>
            <button id="favorite-button" onClick={() => favortieClick()} style={{ backgroundColor : 'white'}}>Favorite</button>
            <Link href={`/pokemon/${pokemon.name}`}>
                <a>
                    <div id='pokecard'>
                        <Image
                            alt={pokemon.name}
                            width={150}
                            height={150}
                            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
                        />
                        <span id='pokename'>{pokemon.name}</span>
                        <span id='pokenumber'>N°{pokeIndex}</span>
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default Pokemon;