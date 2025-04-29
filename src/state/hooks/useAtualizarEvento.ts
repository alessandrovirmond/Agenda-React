import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { listaDeEventoState } from "../atom"

const useAtualizarEvento = () => {
    const setListaDeEventos = useSetRecoilState <IEvento[]>(listaDeEventoState)

    return (evento: IEvento) => {
        return setListaDeEventos(listaAntiga => {
            const indice = listaAntiga.findIndex(e => e.id === evento.id);
            return [
              ...listaAntiga.slice(0, indice),
              evento,
              ...listaAntiga.slice(indice + 1),
            ];
          });
    }

}

export default useAtualizarEvento