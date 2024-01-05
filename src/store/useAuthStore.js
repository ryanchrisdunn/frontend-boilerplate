import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,
  isAdmin: false,
  signin: (user) => {
    set({ isAuth: true, user: { name: user.name, email: user.email, phone_number: user.phone_number }, isAdmin: user.admin });
  },
  signout: () => {
    set({ isAuth: false, user: null, isAdmin: false });
  },
}));

export default useAuthStore;