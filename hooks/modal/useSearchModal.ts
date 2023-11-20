import { IModalProps } from '@/interfaces';
import { create } from 'zustand';

const useSearchModal = create<IModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSearchModal;
