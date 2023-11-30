import { IModalProps } from '@/interfaces';
import { create } from 'zustand';

export const useReviewModal = create<IModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


