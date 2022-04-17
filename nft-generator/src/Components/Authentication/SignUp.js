import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import domain from '../../domain';

const SignUp = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        
        const data = new FormData();
        data.append('name', user.name)
        data.append('userName', user.userName)
        data.append('password', user.password)
        data.append('img', user.img)

        axios.post(`${domain}createUser`, data)
            .then(res => {
                if(res.status === 200) {
                    navigate('/login')
                } else {
                    setError('Wrong Credentials')
                }
            })
    }

    return (
        <>
            <section className="flex justify-center items-center h-screen bg-black">
                <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
                    <div className="mb-4">
                        <p className="text-gray-400">Sign Up</p>
                        <h2 className="text-xl font-bold text-white">Join NFT Generator</h2>
                    </div>
                    <div>
                        <input name="name" onChange={e => user[e.target.name] = e.target.value} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Name" />
                    </div>
                    <div>
                        <input name="userName" onChange={e => user[e.target.name] = e.target.value} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="User Name" />
                    </div>
                    <div>
                        <input name="password" onChange={e => user[e.target.name] = e.target.value} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password" />
                    </div>
                    <div className="grid grid-cols-1 space-y-2 pt-4">
                        <label className="text-sm font-bold text-gray-100 tracking-wide">Add Display Picture</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-4 border-dashed border-blue-500 w-full h-20 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or select a file from your computer</p>
                            </div>
                                <input name="img" type='file' accept="image/png" onChange={e => {
                                    user[e.target.name] = e.target.files[0];
                                }} hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="w-full py-4 bg-blue-500 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">Sign Up</button>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <Link className='text-gray-400' to='/login'>Already have account?</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp
