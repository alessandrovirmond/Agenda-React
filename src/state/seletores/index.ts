import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

export const eventosFiltradosState = selector({
  key: "eventosFiltradosState",
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);
    const eventos = todosOsEventos.filter((evento) => {
      if (!filtro.data) {
        return true;
      }
      const ehOMesmoDia =
        filtro.data.toISOString().slice(0, 10) ===
        evento.inicio.toISOString().slice(0, 10);
      return ehOMesmoDia;
    });
    return eventos;
  },
});

export const eventosAsync = selector({
  key: "eventosAsync",
  get: async () => {
    const response = await fetch("http://localhost:8000/eventos");
    const eventosJson: IEvento[] = await response.json();
    return eventosJson.map((e) => ({
      ...e,
      inicio: new Date(e.inicio),
      fim: new Date(e.fim)
    }));
  },
});
