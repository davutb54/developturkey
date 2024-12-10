import React from 'react'
import './Page.css' // Stil dosyasını ekleyin

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Sayfa Bulunamadı</h1>
      <p className="not-found-message">Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <a className="not-found-link" href="/homepage">Ana Sayfaya Dön</a>
    </div>
  )
}
