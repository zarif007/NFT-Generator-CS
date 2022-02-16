import React from 'react'

const DefaultInstruction = () => {
    return (
        <div>
            <h1 className='font-bold text-2xl pb-2'>Add layers</h1>
            <ul role="list" className="marker:text-blue-500 list-disc pl-5 space-y-3 text-slate-400">
                <li>Add atleast 3 layers</li>
                <ul role="list" className="marker:text-blue-500 list-disc pl-5 space-y-3 text-slate-400">
                    <li>Each Layer's name must be atleast 3 characters</li>
                    <li>All layers name should be unique</li>
                </ul>
                <li>Each layer must contain atleast 1 image</li>
                <ul role="list" className="marker:text-blue-500 list-disc pl-5 space-y-3 text-slate-400">
                    <li>Allowed formates - .png</li>
                </ul>
            </ul>
        </div>
    )
}

export default DefaultInstruction
