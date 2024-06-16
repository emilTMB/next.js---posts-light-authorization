import { atom } from 'nanostores'

export const isAuthenticated = atom<boolean>(false)
export const user = atom<{ id: number; username: string } | null>(null)