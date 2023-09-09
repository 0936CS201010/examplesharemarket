const initialState={
    shareData:{},
}

export default function RootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case "ADD_SHARE":
            state.shareData[action.payload[0]]=action.payload[1]
            console.log(state.shareData)
            return {shareData: state.shareData}
            break
        case "DEL_SHARE":
            delete state.shareData[action.payload[0]]
            console.log(state.shareData)
            return {shareData: state.shareData}
            break
        case "EDIT_SHARE":
            state.shareData[action.payload[0]]=action.payload[1]
            console.log(state.shareData)
            return {shareData: state.shareData}
            break
    }
}