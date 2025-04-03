import { createClient } from 'next-sanity'

export const sanity = createClient({
  projectId: 'm32l9h6i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
