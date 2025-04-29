import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { obterId } from "../../util"
import { listaDeEventoState } from "../atom"

const useAdicionarEvento = () => {

    const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventoState)

    return (evento: IEvento) => {
        const hoje = new Date()
        if (evento.inicio < hoje){
            throw new Error("Eventos passados não podem ser cadastrados")
        }
        evento.id = obterId()
        return setListaDeEventos(listaAntiga => [...listaAntiga, evento])
    }

}

export default useAdicionarEvento