import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'

export default ({ clientStats }) => (req, res) => { // We are returning regular express middleware (that receives a req, res object)
  const app = ReactDOM.renderToString(<App />)
  /*
    When we render this App in this state, what files are we going to need to load onto the server and send to the client
    Flush Chunk Names will load these files by name
  */
  const chunkNames = flushChunkNames() // Loads only the absolutely necessary files to serve the the current state of the application

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.table(['js', js, 'styles', styles, 'cssHash', cssHash, 'scripts', scripts, 'stylesheets', stylesheets])
  res.send(`
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="author" content="Soundpruf">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>Soundpruf Inc.</title>
          ${styles}
        </head>
        <body>
          <div id='root'>${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>
    `)
}
