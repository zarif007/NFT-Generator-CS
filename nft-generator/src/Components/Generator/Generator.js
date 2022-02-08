import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["JPG", "PNG", "GIF"];

const Generator = () => {

    const { generatorId } = useParams();

    const [layers, setLayers] = useState([]);

    const [currentLayer, setCurrentLayer] = useState('');

    const [img, setImg] = useState('')

    const inputNewLayer = useRef('');
    const filePickerRef = useRef();

    const handleImageUpload = e => {
        const reader = new FileReader();
        const updatedLayer = currentLayer
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = readerEvent => {
            updatedLayer.images.push(readerEvent.target.result);
            setCurrentLayer(updatedLayer)
            console.log(currentLayer)
        }
        
    };

    const addLayer = () => {
        const id = Math.random().toString(36).substr(2, 5);
        const newLayer = {
            id,
            name: inputNewLayer.current.value,
            images: [],
        }
        setLayers([...layers, newLayer]);
        setCurrentLayer(newLayer);
        inputNewLayer.current.value = ''
    }

    return (
        <div className='flex flex-col md:flex-row text-white xl:p-24 xl:pt-12 md:p-8 p-4'> 
            <div className='w-full md:w-96'>
                <p className='font-bold text-xl pb-12'>Layers</p>
                <div className='flex flex-col'>

                    {
                        layers.map(layer => {
                            return (
                                <div onClick={() => setCurrentLayer(layer)} className='p-6 mb-2 bg-gray-900 rounded-lg text-white'>
                                    <h1 className='font-bold text-lg'>{layer.name}</h1>
                                </div>
                            )
                        })
                    }

                    <div className="flex flex-row pl-4 pr-4 xl:pl-8 xl:pr-8 pt-4 pb-4 bg-gray-900 rounded-lg gap-4">
                        <input type="name" className="w-full px-4 py-1 text-white focus:outline-none bg-black text-md font-sans"
                            placeholder='Layer Name' ref={inputNewLayer} />

                        <div className=''>
                            <button onClick={addLayer} 
                            className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-sm" >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    
                </div>
            </div>
            <div className='w-full md:pl-12 xl:pl-32 pt-12 md:pt-0'>
                <p className='font-bold text-xl pb-12'>Display Images</p>
                <h1>{currentLayer.name}</h1>

                {
                    currentLayer !== '' && currentLayer.images.map(image => {
                        return (
                            <img src={image}/>
                        )
                    })
                }
                <div className='flex flex-wrap w-full pt-4' onClick={() => filePickerRef.current.click()}>
                    Add
                    <input type='file' onChange={handleImageUpload} ref={filePickerRef} hidden/>
                </div>

                
            </div>
        </div>
    )
}

export default Generator
