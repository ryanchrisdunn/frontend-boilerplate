import { create } from 'zustand';

const useResetPasswordStore = create((set) => ({
  email: null,
  code: null,
  setEmail: (newEmail) => set((state) => ({ ...state, email: newEmail })),
  setCode: (newCode) => set((state) => ({ ...state, code: newCode })),
  resetState: () => set(() => ({email: null, code: null})),
}));

export default useResetPasswordStore;