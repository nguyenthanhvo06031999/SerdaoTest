import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Beneficiary {
  id: number;
  firstName: string;
  lastName: string;
  iban: string;
}

interface BeneficiariesState {
  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficiary: Pick<Beneficiary, 'firstName' | 'lastName' | 'iban'>) => void;
  getNextId: () => number;
}

let currentId = 1;

const useBeneficiariesStore = create<BeneficiariesState>()(
  persist(
    (set, get) => ({
      beneficiaries: [],
      addBeneficiary: (beneficiary) =>
        set((state) => ({
          beneficiaries: [...state.beneficiaries, { id: get().getNextId(), ...beneficiary }],
        })),
      getNextId: () => currentId++,
    }),
    {
      name: 'beneficiaries-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useBeneficiariesStore;
