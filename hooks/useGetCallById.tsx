import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"

export const useGetCallById = (id: string | string[]) => {
    const client = useStreamVideoClient();
    const [call, setCall] = useState<Call>();
    const [callIsLoading, setCallIsLoading] = useState(true);

    useEffect(() => {
        if(!client )return;

        const loadCall = async() => {
            const {calls} = await client.queryCalls({
                filter_conditions: {
                    id
                }
            });
            if(calls.length > 0) setCall(calls[0]);
            setCallIsLoading(false);
        }
        loadCall();

    }, [client, id])

    return { call, callIsLoading };
}