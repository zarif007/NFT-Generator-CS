import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Generator = () => {

    const { generatorId } = useParams();

    const [layers, setLayers] = useState([]);

    const addLayers = () => {
        console.log('ok')
    }

    return (
        <div className='flex flex-col md:flex-row text-white xl:p-24 xl:pt-12 md:p-12 p-4'> 
            <div className='w-full md:w-80 xl:w-96'>
                <p className='font-bold text-xl pb-12'>Layers</p>
                <div className='flex flex-col'>

                    <div className='p-8 mb-2 bg-gray-900 rounded-lg text-white'>
                        <h1 className='font-bold text-lg'>hi</h1>
                    </div>

                    <div className="flex flex-row p-8 pt-4 pb-4 bg-gray-900 rounded-lg gap-4">
                        <input type="name" className="w-full px-4 py-1 text-white focus:outline-none bg-black text-md"
                            placeholder="Layer Name" />

                        <div className=''>
                            <button onClick={() => addLayers()} className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-sm" >
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    
                </div>
            </div>
            <div className='w-full md:w-80 xl:w-96'>
                <p className='font-bold text-xl text-center '>Display Images</p>
            </div>
        </div>
    )
}

export default Generator
