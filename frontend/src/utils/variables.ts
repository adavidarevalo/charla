const environment = import.meta.env.VITE_ENVIRONMENT ?? 'dev'
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT
const bytescaleSecret = import.meta.env.VITE_BYTESCALE_SECRET

export { environment, apiEndpoint, bytescaleSecret }
