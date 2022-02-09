import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';

const Generator = () => {

    const { generatorId } = useParams();

    const [layers, setLayers] = useState([]);

    const [currentLayer, setCurrentLayer] = useState('');

    const [showOptions, setShowOptions] = useState(false);

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
                                Layer Name: <span className='text-2xl font-bold'>{currentLayer.name}</span>
                            </span> 
                            <button className='hover:border-blue-600 border-2 border-blue-500 text-white p-4 rounded text-lg font-bold pb-0 pt-0'
                                onClick={() => setShowOptions(!showOptions)} >
                                Options {showOptions ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i>}
                            </button>
                        </div>
                    )
                }
                
                
                <div className='flex flex-row flex-wrap'>
                    {
                        currentLayer !== '' && currentLayer.images.map(image => {
                            return (
                                <div className='p-2 ml-2'>
                                    <span className='text-white bg-gray-900 p-1 rounded-sm bg-opacity-70'>{image.rarity}%</span>
                                    <img src={image.value} className="max-h-64 object-contain"/>
                                    <span className='text-white bg-gray-900 p-1 rounded-sm bg-opacity-70 ml-2'>{image.name}</span>
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
