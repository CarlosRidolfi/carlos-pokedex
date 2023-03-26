import React from 'react';
import Layout from "../../components/Layout/Layout.jsx";
import Image from "next/image";
import Link from 'next/link.js';
import Pokedex from "../../assets/images/pokedex.png";

const Pokemon = ({pokemon}) => {
    const pokeIndex = ('000' + (pokemon.id)).slice(-3)
    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const [pokeBg, changePokeBg] = React.useState('white')

    // Type Color Handler
    React.useEffect(() => {
        pokemon.types.map((type) => {
            if (type.type.name === 'grass')
                changePokeBg('#7AC74C')
            if (type.type.name === 'normal')
                changePokeBg('#A8A77A')
            if (type.type.name === 'fire')
                changePokeBg('#EE8130')            
            if (type.type.name === 'water')
                changePokeBg('#6390F0')
            if (type.type.name === 'electric')
                changePokeBg('#F7D02C')
            if (type.type.name === 'ice')
                changePokeBg('#96D9D6')   
            if (type.type.name === 'fighting')
                changePokeBg('#C22E28')
            if (type.type.name === 'poison')
                changePokeBg('#A33EA1')
            if (type.type.name === 'ground')
                changePokeBg('#E2BF65')    
            if (type.type.name === 'flying')
                changePokeBg('#A98FF3')
            if (type.type.name === 'psychic')
                changePokeBg('#F95587')
            if (type.type.name === 'bug')
                changePokeBg('#A6B91A')    
            if (type.type.name === 'rock')
                changePokeBg('#B6A136')
            if (type.type.name === 'ghost')
                changePokeBg('#735797')    
            if (type.type.name === 'dragon')
                changePokeBg('#6F35FC')
            if (type.type.name === 'dark')
                changePokeBg('#705746')
            if (type.type.name === 'steel')
                changePokeBg('#B7B7CE')        
            if (type.type.name === 'fairy')
                changePokeBg('#D685AD')                                
        })
    }, [pokemon.types])

    const renderTypes = () => {
        return (
            pokemon.types.map((type) => {
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