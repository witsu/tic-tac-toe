import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import GamePage from './GamePage.tsx'
import GamesPage from './GamesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="games/:gameId" element={<GamePage />} />
          <Route path="games" element={<GamesPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  </StrictMode>,
)
