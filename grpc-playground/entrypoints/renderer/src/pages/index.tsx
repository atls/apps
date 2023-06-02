import React   from 'react'
import dynamic from 'next/dynamic'

const IndexPage = dynamic({
  loader: async () => (await import('@grpc-playground/index-page')).IndexPage,
  ssr: false,
})

const Page = () => <IndexPage />

export default Page
