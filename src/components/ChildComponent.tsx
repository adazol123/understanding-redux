import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { incremented, decremented, amountAdded, toggleState } from '../features/store/store-slice'
import { auth } from '../api/firebase';
import { logout } from '../features/user/user-auth-slice';

const ChildComponent = () => {
    const value = useAppSelector(state => state.counter.store.value);
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch();
    console.log('child is rendering...')
    if (!user) return <div>Loading ...</div>
    return (
        <div>ChildComponent {value.toString()}
            <h2>{user.displayName}</h2>
            <h2>{user.email}</h2>
            <button onClick={() => dispatch(incremented())}>
                count is {value.toString()}
            </button>
            <button type='button'
                onClick={async () => {
                    await auth.signOut();
                    dispatch(logout())
                }}
            >Logout</button>
        </div>
    )
}

export default ChildComponent