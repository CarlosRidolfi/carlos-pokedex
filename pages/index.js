import Layout from "../components/Layout/Layout.jsx";
import { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon/Pokemon.jsx";
import React from "react";
import Link from "next/link.js";

export default function Home({initialPokemon}) {
    const [pokemon, setPokemon] = useState(initialPokemon)
    const [offset, setOffet] = useState(0)

    const fetchPokemon = async (url, next) => {
        const response = await fetch(url)
        const nextPokemon = await response.json()

        setOffet(next ? offset + 20 : offset - 20)
        setPokemon(nextPokemon)
    }

    console.log(pokemon.results)

    return (                                                             
        <Layout title={"Pokedex"}>
            <button id='favorite-link'><Link href={"/favorites"}>FAVORITES</Link></button>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
                {pokemon.results.map((monster,index) => (
                    <Pokemon key={index} pokemon={monster} index={index + offset}/>
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