
import { Driver } from "../utils/types";
import { create } from "zustand";

interface AssignBikeModalState {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    selectedDriver: Driver | null;
    setSelectedDriver: (driver: Driver | null) => void;
}

const useAssignBikeModal = create<AssignBikeModalState>((set) => ({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({ isOpen }),
    selectedDriver: null,
    setSelectedDriver: (driver) => set({ selectedDriver: driver })
}));

export default useAssignBikeModal;