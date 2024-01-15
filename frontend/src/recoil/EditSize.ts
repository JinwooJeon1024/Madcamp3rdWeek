import { atom, useRecoilState } from "recoil";

export const EditSizeLeft = atom<number>({
    key: 'EditSizeLeft',
    default : 0
})
export const EditSizeTop = atom<number>({
    key: 'EditSizeTop',
    default : 0
})

export const useEditSize = () =>{
    const [top, setTop] = useRecoilState(EditSizeTop)
    const [left, setLeft] = useRecoilState(EditSizeLeft)

    return {top, left, setTop, setLeft}
}