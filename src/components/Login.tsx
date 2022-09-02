import React from 'react'
import { auth, signInWithEmailAndPassword, updateProfile } from '../api/firebase'
import { login } from '../features/user/user-auth-slice';
import { useAppDispatch } from './../app/hooks';

interface CredentialProps {
    email: string;
    password: string;
    name: string;
    profilePic: string;

}

const Login = () => {
    const [credentials, setCredentials] = React.useState<Partial<CredentialProps>>({
        email: undefined,
        password: undefined,
        name: undefined,
        profilePic: undefined
    })
    console.log('login is rendering ...')

    const dispatch = useAppDispatch()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (credentials.email && credentials.password) {
            try {
                let userAuth = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoUrl: userAuth.user.photoURL
                }))
            } catch (error: any) {
                console.log(error.message)
            }

        }
    }
    return (
        <div>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder='e.g. (john.doe@email.com)'
                    value={credentials.email}
                    onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={credentials.password}
                    onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                />
                <button>Sign in</button>
            </form>
        </div>
    )
}

export default Login