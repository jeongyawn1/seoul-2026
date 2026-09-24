import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Itinerary from './pages/Itinerary'
import MapPage from './pages/Map'
import Discover from './pages/Discover'
import Food from './pages/Food'
import Shopping from './pages/Shopping'
import Wishlist from './pages/Wishlist'
import Budget from './pages/Budget'
import TripInfo from './pages/TripInfo'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/food" element={<Food />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/info" element={<TripInfo />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
