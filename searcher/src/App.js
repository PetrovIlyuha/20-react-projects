import React from "react"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Stats,
} from "react-instantsearch-dom"

import "./App.css"

const searchClient = algoliasearch(
  "W9JYMCP5G7",
  "9e5370c9d6ab6282a5c2e9019c9d2489"
)
// index name: products

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName='products'>
      <div className='app'>
        <div className='search-container'>
          <Stats />
          <SearchBox />
          <Hits hitComponent={Product} />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  )
}

const Product = ({ hit }) => {
  return (
    <a
      className='product'
      href={hit.url}
      target='_blank'
      rel='noopener noreferrer'>
      <img src={hit.image} alt={`${hit.name} product image`} />
      <div>
        <h3>{hit.brand}</h3>
        <h2>{hit.name}</h2>
        <p>${hit.price}</p>
      </div>
    </a>
  )
}
