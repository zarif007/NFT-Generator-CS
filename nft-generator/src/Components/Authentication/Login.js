import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import domain from '../../domain';


const Login = () => {

    const [loginCred, setLoginCred] = useState({});
    const [error, setError] = useState('');
    const {user, setUser} = useContext(LoginContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setError('')
        axios.get(`${domain}userDetails/${loginCred.userName}`)
            .then(res => {
                console.log(res)
                if(res.data.length === 0){
                    setError('User Does not Exist')
                } else if(res.data[0].password !== loginCred.password) {
                    setError('Wrong password and username combination');
                } else {
                    setUser(res.data[0]);
                    navigate(-1)
                }
            });
    }


    return (
        <>
            <section className="flex justify-center items-center h-screen bg-black">
                <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
                    <div className="mb-4">
                        <p className="text-gray-400">Sign In</p>
                        <h2 className="text-xl font-bold text-white">Generate NFTs</h2>
                    </div>
                    <div>
                        <input name='userName' onChange={e => loginCred[e.target.name] = e.target.value} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="User Name" />
                    </div>
                    <div>
                        <input name='password' onChange={e => loginCred[e.target.name] = e.target.value} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password" />
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div>
                        <button onClick={handleSubmit} className="w-full py-4 bg-blue-500 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">Sign In</button>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <div className="flex flex-row items-center">
                            <input type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <label for="comments" className="ml-2 text-sm font-normal text-gray-400">Remember me</label>
                        </div> */}
                        <div>
                            <Link className='text-gray-400' to='/signup'>Create Account</Link>
                        </div>
                        <div>
                            <a className="text-sm text-blue-600 hover:underline" href="#">Forgot password?</a>
                        </div>
                    </div>
                </div>
            </section>
        </>     
    )
}


export default Login
