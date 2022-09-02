import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented, decremented, amountAdded, toggleState } from './features/store/store-slice'

import { apiSlice, useFetchBreedsQuery } from './features/dogs/dogs-api-slice'
function App() {
  const dataStore = useAppSelector(state => state.counter.store);
  const dispatch = useAppDispatch();


  const { data = [], isFetching } = useFetchBreedsQuery()

  function handleClick() {
    dispatch(amountAdded(5))
  }
  console.log(data)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div>
        <p>Number of dogs fetched: {data.length}</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map(breed => (
              <tr key={breed.id}>
                <td>
                  <img src={breed.image.url} alt={breed.name} height={250} width={250} />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {dataStore.value}
        </button>
        <button onClick={() => dispatch(toggleState())}>
          toggled {dataStore.state.toString()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
