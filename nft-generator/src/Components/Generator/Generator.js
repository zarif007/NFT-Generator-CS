import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';


const Generator = () => {

    const { generatorId } = useParams();

    const [layers, setLayers] = useState([]);

    const [currentLayer, setCurrentLayer] = useState('');

    const [showOptions, setShowOptions] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const inputNewLayer = useRef('');
    const filePickerRef = useRef();

    const handleImageUpload = e => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = readerEvent => {
            const rarity = (100 / (currentLayer.images.length + 1)).toFixed(2);
            const imageData = {
                name: Math.random().toString(36).substr(2, 5) + '#' + rarity,
                value: readerEvent.target.result,
                rarity,
            }
            currentLayer.images.map(image => {
                image.rarity = rarity;
                image.name = image.name.split('#')[0] + '#' + rarity
            })
            setCurrentLayer({...currentLayer, ...currentLayer.images.push(imageData)});
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

    const handleOnDragEnd = result => {
        if (!result.destination) return;

        const items = Array.from(layers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLayers(items)
    }

    const generate = () => {
        const data = {
            generatorId,
            layers,
        }

        console.log(data);
    }

    return (
        <div className='flex flex-col md:flex-row text-white xl:p-24 xl:pt-12 md:p-8 p-4'> 
            <div className='w-full md:w-96'>
                <p className='font-bold text-xl pb-12'>Layers</p>
                <div className='flex flex-col'>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='layers'>
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        layers.map((layer, index) => {
                                            return (
                                                <Draggable key={layer.id} draggableId={layer.id} index={index}>
                                                    {
                                                        provided => (
                                                            <div onClick={() => setCurrentLayer(layer) } 
                                                                className='p-6 mb-2 bg-gray-900 rounded-lg text-white flex flex-row justify-between'
                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <h1 className='font-bold text-lg'>{layer.name}</h1>
                                                                <p className='text-lg bg-black p-1 rounded-md pl-2 pr-2'>{layer.images.length}</p>
                                                            </div>
                                                        )
                                                    }    
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className="flex flex-row pl-4 pr-4 xl:pl-8 xl:pr-8 pt-4 pb-4 bg-gray-900 rounded-lg gap-4">
                        <input type="name" className="w-full px-4 py-1 text-white focus:outline-none bg-black text-md font-sans"
                            placeholder='Layer Name' ref={inputNewLayer} />
                        <div className=''>
                            <button onClick={addLayer} 
                            className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-sm hover:bg-blue-600" >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={generate}
                className='relative mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full h-16 rounded text-2xl font-bold overflow-visible'>
                    Generate</button>
            </div>
            <div className='w-full md:pl-12 xl:pl-32 pt-12 md:pt-0'>
                <p className='font-bold text-xl pb-12'>Display Images</p>
                {
                    currentLayer !== '' && (
                        <div className='flex flex-row gap-4'>
                            <span 
                                className='text-md font-bold bg-gray-900 p-3 rounded-md mb-2'>
                                Layer Name: <span className='text-xl font-bold'>{currentLayer.name}</span>
                            </span> 
                            <button className='bg-gray-900 text-white p-3 rounded text-md font-bold'
                                onClick={() => setShowOptions(!showOptions)} >
                                Options {showOptions ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                            </button>
                        </div>
                    )
                }
                
                {
                    showOptions && <div className='bg-gray-900 p-6 rounded-md mt-6 mb-6 flex flex-row flex-wrap gap-4'>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white p-6 rounded text-md font-bold pb-2 pt-2'
                            onClick={() => setShowModal(true)}>
                            Rarity <i className="fas fa-sliders-h"></i>
                        </button>
                        <button className='bg-red-500 hover:bg-red-600 text-white p-6 rounded text-md font-bold pb-2 pt-2'>
                            Delete Layer <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                }

                {
                    showModal && (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-full min-w-[50%]">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blue-500 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Adjust Rarity
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    X
                                                </span>
                                            </button>
                                        </div>
                                        <div className="relative p-6 flex-auto">
                                            <div className='flex flex-col flex-wrap'>
                                                {
                                                    currentLayer.images.map(image => {
                                                        return (
                                                            <div className='flex flex-row flex-wrap justify-between p-3 text-lg'>
                                                                <img src={image.value} className="max-h-12 object-contain "/>
                                                                <h1 className='p-2 '>{image.name}</h1>
                                                                <h1 className='p-2 '>{image.rarity}%</h1>
                                                                <div class="flex justify-center pt-3 w-2/5">
                                                                    <input type="range" class="appearance-none
                                                                        w-full h-2 bg-grey rounded outline-none slider-thumb" 
                                                                        defaultValue={12}
                                                                        onChange={e => console.log(e.target.value)}/>
                                                                </div>
                                                            </div>                                                            
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blue-500 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    )
                }
               
                
                <div className='flex flex-row flex-wrap'>
                    {
                        currentLayer !== '' && currentLayer.images.map(image => {
                            return (
                                <div className='p-2 ml-2 mt-2'>
                                    <div className='-mb-8 absolute flex flex-row justify-between'>
                                        <span className='text-white bg-gray-900 p-1 rounded-sm bg-opacity-50'>{image.rarity}%</span>
                                    </div>
                                    {/* <div className='flex flex-row-reverse -mb-3 relative' onClick={() => handleDeleteImage(image.name)}>
                                        <i className="far fa-times-circle white-black bg-gray-900 p-1 rounded-full bg-opacity-50"></i>
                                    </div> */}
                                    <img src={image.value} className="max-h-52 object-contain"/>
                                    <div className='-mt-6'>
                                        <span className='text-white bg-gray-900 p-1 rounded-sm bg-opacity-50'>{image.name}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    currentLayer !== '' ? 
                    <div className="grid grid-cols-1 space-y-2 pt-4">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Add Images</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-4 border-dashed border-blue-500 w-full h-40 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or select a file from your computer</p>
                            </div>
                                <input type='file' accept="image/gif, image/jpeg, image/png, image/jpg" onChange={handleImageUpload} ref={filePickerRef} hidden />
                            </label>
                        </div>
                    </div> :
                    <h1 className='font-bold text-2xl'>Add layer</h1>
                }  
            </div>
        </div>
    )
}

export default Generator
