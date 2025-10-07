"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id)
        if (!existingItem) {
          set({ items: [...get().items, item] })
        }
      },

      removeFromWishlist: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
