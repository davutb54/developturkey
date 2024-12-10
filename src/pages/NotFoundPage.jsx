import './Page.css' // Stil dosyasını ekleyin
import { useNavigate } from 'react-router'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Sayfa Bulunamadı</h1>
      <p className="not-found-message">Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <a className="not-found-link" onClick={() => navigate("/homepage")}>Ana Sayfaya Dön</a>
    </div>
  )
}
