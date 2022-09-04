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

const useFirebaseFetcher = <T extends keyof typeof StatusLike, K>(status: T, fetcher: AsyncThunkAction<K, void, {}>) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetcher)
        }
    }, [status, dispatch])
}

export default useFirebaseFetcher