import React from "react";
import { Container, Image } from "semantic-ui-react";

export default function AboutUsPage() {
  return (
    <Container textAlign="center" style={{ marginTop: "20px" }}>
      <p style={{ fontSize: "16px", fontWeight: "bold", color: "#f0f0f0" }}>
        TÜRKİYE’Yİ GELİŞTİRME PLATFORMU Ülkemizin vatandaşları olarak;
        sorunlarımızı tespit etmek, çözüm önerileri sunmak için bir araya
        geliyoruz. Etkileşimli bir şekilde çözümleri tartışarak daha etkili ve
        kalıcı sonuçlar elde etmeyi hedefliyoruz. Her bir bireyin katkısıyla
        ülkemizin geleceğini daha aydınlık bir hale getirebiliriz. Birlikte
        hareket ederek daha güçlü bir toplum oluşturabiliriz..
      </p>
      <Image
        src="../images/flag.png"
        alt="About Us"
        style={{ marginTop: "20px" }}
        centered
      />
    </Container>
  );
}
