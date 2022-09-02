import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { incremented, reset } from '../features/store/store-slice'
import { auth, docQuery } from '../api/firebase';
import { logout } from '../features/user/user-auth-slice';
import { fetchProduct } from '../features/store/product-slice';
import { onSnapshot } from 'firebase/firestore';


const ChildComponent = () => {
    const dispatch = useAppDispatch();

    const value = useAppSelector(state => state.counter.store.value);
    const user = useAppSelector(state => state.user.user)
    const products = useAppSelector(state => state.store.products)

    React.useEffect(() => {
        console.log('rendering child...')
        let productUnsubscribe = onSnapshot(docQuery, (querySnapshot) => {
            let items = querySnapshot.docs.map(item => item.data())
            dispatch(fetchProduct(items))
        })
        return () => {
            console.log('unmounted!')
            productUnsubscribe()
        }
    }, [])

    if (!user) return <div>Loading ...</div>
    return (
        <div className='flex flex-col gap-6'>
            <h1>
                ChildComponent {value.toString()}

            </h1>
            <div className='p-6 rounded-md bg-neutral-50 drop-shadow border border-neutral-100'>
                <h2>{user.displayName}</h2>
                <h2>{user.email}</h2>
                <button className='w-fit mx-auto' type='button'
                    onClick={async () => {
                        await auth.signOut();
                        dispatch(logout())
                    }}
                >Logout</button>
            </div>
            <button className='w-fit mx-auto' onClick={() => dispatch(incremented())}>
                count is {value.toString()}
            </button>
            {value > 20 &&
                <button className='w-fit mx-auto' onClick={() => dispatch(reset())}>
                    {value < 30 ? "Reset Count" : "Max speed 🙂 (30)"}
                </button>}

            <div>
                {products.map((item, index) => (
                    <div key={index}>

                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <img src={item.metatags.images[0].url} alt={item.name} className='w-64 h-64 object-cover rounded-md' />
                    </div>
                ))

                }
            </div>
        </div>
    )
}

export default ChildComponent