import Layout from "../components/Layout/Layout.jsx";
import {useState} from "react";
import FavoritePokemon from "../components/FavoritePokemon/FavoritePokemon.jsx";
import React from "react";
import Link from "next/link.js";
import Image from "next/image.js";
import Pokedex from "../assets/images/pokedex.png";

export default function Favorites({initialPokemon}) {
    const [pokemon, setPokemon] = useState(initialPokemon)
    const [offset, setOffet] = useState(0)

    const favoritePokemons = []

    if (typeof window !== 'undefined') {
        for (const key in localStorage) {
            favoritePokemons.push(localStorage.getItem(key))
        }
    }

    const cleanNulls = favoritePokemons.filter((element) => {
        return element !== null
    })

    const favoritesParsed = cleanNulls.map((pokemon) => {
        return JSON.parse(pokemon)
    })

    console.log(favoritesParsed)

    return (                                                             
        <Layout title={"Pokedex"}>
            <Link href='/' data-cy="pokedex-link">
                    <div id='pokedex-button'>
                        <Image src={Pokedex} alt='home button' width={90} height={60} />
                    </div>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
                {favoritesParsed.map((pokemon, key) => (
                    <FavoritePokemon key={key} pokemon={pokemon} index={key}/>
                ))}
            </div>

            <div id="buttons-wrapper">
                <button disabled={!pokemon.previous} id="previous" onClick={() => fetchPokemon(pokemon.previous, false)}>prev</button>
                <button disabled={!pokemon.next} id="next" onClick={() => fetchPokemon(pokemon.next, true)}>next</button>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon")
    const initialPokemon = await response.json()

    return {
        props: {
            initialPokemon
        }
    }
}