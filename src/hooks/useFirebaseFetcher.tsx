import { AsyncThunkAction } from "@reduxjs/toolkit"
import { DocumentData } from "firebase/firestore"
import { useEffect } from "react"
import { useAppDispatch } from "../app/hooks"

enum StatusLike {
    idle = "idle",
    loading = "loading",
    success = "success",
    failed = "failed",
}

const useFirebaseFetcher = <S extends keyof typeof StatusLike, A>(status: S, fetcher: AsyncThunkAction<A, void, {}>) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetcher)
        }
    }, [status, dispatch])
}

export { useFirebaseFetcher }