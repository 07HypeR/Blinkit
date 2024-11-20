import {create} from 'zustand';

interface MapRefStore {
  mapRef: any;
  setMapRef: (ref: any) => void;
}

export const useMapRefStore = create<MapRefStore>(set => ({
  mapRef: null,
  setMapRef: ref => set({mapRef: ref}),
}));
