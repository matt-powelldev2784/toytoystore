import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'm32l9h6i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(sanity)

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source)

