import React from 'react';
import Layout from "../../components/Layout/Layout.jsx";
import Image from "next/image";
import Link from 'next/link.js';
import Pokedex from "../../assets/images/pokedex.png";
import { HandleTypeColors } from './TypeColors.jsx';

const Pokemon = ({pokemon}) => {
    const pokeIndex = ('000' + (pokemon.id)).slice(-3)
    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const [pokeBg, changePokeBg] = React.useState('white')

    // Type Color Handler
    React.useEffect(() => {
        HandleTypeColors(pokemon.types, changePokeBg)
    }, [pokemon.types])

    const renderTypes = () => {
        return (
            pokemon.types.map((type) => {
                console.log(type)
                return (
                    <li id='pokemon-type' style={{backgroundColor : pokeBg}} key={type.slot}>
                        {type.type.name}
                    </li>
                )
        })
    )};

    const renderStats = () => (
        pokemon.stats.map((stat, index) => (
            <div id='stats-table' key={index}>
                <div id='stats'>
                    <span>{stat.stat.name}:</span>
                    <span>{stat.base_stat}</span>
                </div>
            </div>
        ))
    )

    return (
        <Layout title={pokeName}>
            <div id='page-wrapper'>
                <Link href='/' data-cy="pokedex-link">
                    <div id='pokedex-button'>
                        <Image src={Pokedex} alt='home button' width={90} height={60} />
                    </div>
                </Link>
                <div id='pokemon-card'>
                    <div className="flex flex-col justify-center items-center">
                        <h1 id='pokemon-title'>{pokemon.name}</h1>
                        <Image
                            alt={pokemon.name}
                            width={300}
                            height={300}
                            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
                        />
                    </div>

                    <div>
                        <ul className="flex gap-5">
                            {renderTypes()}
                        </ul>

                        <div id='stats-wrapper'>
                            {renderStats()}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Pokemon;

export async function getServerSideProps(context) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.query.name}`)
    const pokemon = await response.json()

    return {
        props: {
            pokemon
        }
    }
}