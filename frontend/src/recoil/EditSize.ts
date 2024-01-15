import { atom, useRecoilState } from "recoil";

export const EditSizeX = atom<number>({
    key: 'EditSizeX',
    default : 0
})
export const EditSizeY = atom<number>({
    key: 'EditSizeY',
    default : 0
})

export const useEditSize = () =>{
    const [X, setX] = useRecoilState(EditSizeX)
    const [Y, setY] = useRecoilState(EditSizeY)

    return {X, Y, setX, setY}
}