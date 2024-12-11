import './Page.css' // Stil dosyasını ekleyin
import { useNavigate } from 'react-router'
import { Container, Header, Button, Icon } from 'semantic-ui-react' // Semantic UI bileşenlerini ekleyin

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container textAlign="center" className="not-found-container">
      <Header as="h1" icon className="not-found-title">
        <Icon name="exclamation triangle" />
        Sayfa Bulunamadı
      </Header>
      <p className="not-found-message">Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <Button primary onClick={() => navigate("/homepage")} className="not-found-link">
        Ana Sayfaya Dön
      </Button>
    </Container>
  )
}
