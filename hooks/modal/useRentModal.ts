import { IModalProps } from '@/interfaces';
import { create } from 'zustand';

const useRentModal = create<IModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRentModal;
