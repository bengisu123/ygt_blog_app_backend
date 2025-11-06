Feature: Yeni kullanıcı kaydı
  Bir ziyaretçi olarak sisteme yeni kullanıcı eklemek istiyorum
  Böylece uygulamada kendi hesabımı kullanabilirim

  Scenario: Kullanıcı başarıyla kayıt olur
    Given API sunucusu çalışıyor
    When kullanıcı geçerli bilgileri gönderir
    Then API 201 Created döndürmelidir

