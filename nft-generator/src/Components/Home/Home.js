import React from 'react'
import { useNavigate } from 'react-router-dom'

const uuid = require("uuid");

const Home = () => {

    const navigate = useNavigate();

    const sendToGeneratePage = () => {
        const generatorId = uuid.v4();
        navigate(`/generate/${generatorId}`)
    } 

    return (
        <section className="py-20 lg:py-28 bg-[black] h-full">
                <div className="container mx-auto px-5 text-center">
                    <div className="mb-16">
                        <div className="space-y-4 mb-12">
                            <h4 className="text-2xl sm:text-3xl font-semibold text-blue-500">NFT Generator</h4>
                            <h1 className="text-5xl sm:text-7xl font-bold text-white uppercase">Create NFTs</h1>
                        </div>
                        <button onClick={() => sendToGeneratePage()} className='relative bg-blue-500 hover:bg-blue-600 text-white p-6 rounded text-2xl font-bold overflow-visible'>Get Started</button>
                    </div>
                    <img className="mx-auto xl:max-w-screen-lg mb-28 rounded-md" src="https://media.giphy.com/media/E3y79zUo2V4v8AFG2V/giphy.gif" alt="Monster"/>
                </div>
            </section>
    )
}

export default Home
