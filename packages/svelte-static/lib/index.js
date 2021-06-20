import { getContext } from 'svelte'

export { default as Link } from './app/components/Link.svelte'
export const getRouter = () => getContext('router')