
import React from 'react';
import { AcademyTip } from '../types';
import { SkullIcon, LockIcon, AlertIcon, WifiIcon, ShieldIcon, CheckIcon, BookIcon, FilterIcon } from '../components/Icons';

export const TIPS: AcademyTip[] = [
    // TEHDİTLER (Hacker Yöntemleri)
    {
        id: 101,
        title: "Phishing (Oltalama)",
        content: "Hackerlar banka veya resmi kurum taklidi yaparak sahte e-postalar atar. 'Acil işlem gerekli' diyerek panik yaratır ve sizi sahte bir siteye yönlendirip şifrenizi girmeye zorlarlar.",
        category: 'Tehditler',
        icon: <SkullIcon className="w-6 h-6 text-red-500" />,
        difficulty: 'Başlangıç'
    },
    {
        id: 102,
        title: "Ransomware (Fidye Yazılımı)",
        content: "Bilgisayarınızdaki tüm dosyaları şifreleyen ve açmak için kripto para ile fidye isteyen zararlı yazılımdır. Genellikle e-posta eklerinden bulaşır.",
        category: 'Tehditler',
        icon: <LockIcon className="w-6 h-6 text-red-500" />,
        difficulty: 'Orta'
    },
    {
        id: 103,
        title: "Keylogger",
        content: "Bastığınız her tuşu kaydeden casus yazılımdır. Şifrelerinizi, kredi kartı bilgilerinizi ve mesajlarınızı saldırgana gönderir.",
        category: 'Tehditler',
        icon: <AlertIcon className="w-6 h-6 text-orange-500" />,
        difficulty: 'İleri'
    },
    {
        id: 104,
        title: "Man-in-the-Middle",
        content: "Halka açık güvensiz Wi-Fi ağlarında, cihazınız ile internet arasına giren hacker, tüm veri trafiğinizi (şifreler dahil) izleyebilir.",
        category: 'Tehditler',
        icon: <WifiIcon className="w-6 h-6 text-yellow-500" />,
        difficulty: 'Orta'
    },
    {
        id: 105,
        title: "Juice Jacking",
        content: "Havalimanı veya AVM'lerdeki USB şarj istasyonlarına dikkat edin. Saldırganlar bu portlara veri çalan cihazlar yerleştirmiş olabilir. Kendi adaptörünüzü kullanın.",
        category: 'Tehditler',
        icon: <AlertIcon className="w-6 h-6 text-red-600" />,
        difficulty: 'Başlangıç'
    },
    {
        id: 106,
        title: "Vishing (Sesli Oltalama)",
        content: "Sizi telefonla arayıp polis veya bankacı gibi davranan dolandırıcılardır. 'Hesabınız ele geçirildi' diyerek şifrelerinizi veya parayı isterler.",
        category: 'Tehditler',
        icon: <SkullIcon className="w-6 h-6 text-red-500" />,
        difficulty: 'Başlangıç'
    },
    {
        id: 107,
        title: "USB Baiting (Yemleme)",
        content: "Hackerlar otopark veya ofis önüne virüslü USB bellekler bırakır. Merak edip bilgisayarınıza takarsanız virüs bulaşır.",
        category: 'Tehditler',
        icon: <LockIcon className="w-6 h-6 text-orange-500" />,
        difficulty: 'Orta'
    },
    {
        id: 108,
        title: "Deepfake Dolandırıcılığı",
        content: "Yapay zeka ile tanıdığınız birinin sesini veya görüntüsünü taklit edebilirler. Para isteyen bir tanıdığınız varsa, mutlaka onu geri arayıp teyit edin.",
        category: 'Tehditler',
        icon: <SkullIcon className="w-6 h-6 text-purple-500" />,
        difficulty: 'İleri'
    },
    {
        id: 109,
        title: "IoT Saldırısı",
        content: "Akıllı ampul, robot süpürge gibi cihazlarınızın şifrelerini değiştirin. Hackerlar bu cihazlar üzerinden ev ağınıza sızabilir.",
        category: 'Tehditler',
        icon: <WifiIcon className="w-6 h-6 text-orange-500" />,
        difficulty: 'Orta'
    },
    {
        id: 110,
        title: "Bloatware",
        content: "Yeni alınan cihazlarda yüklü gelen gereksiz ve bazen güvensiz yazılımlardır. Cihazı ilk aldığınızda gereksiz her şeyi silin.",
        category: 'Tehditler',
        icon: <AlertIcon className="w-6 h-6 text-yellow-600" />,
        difficulty: 'Başlangıç'
    },

    // SAVUNMA
    {
        id: 201,
        title: "2FA (İki Adımlı Doğrulama)",
        content: "Şifreniz çalınsa bile hesabınızı korur. Şifreden sonra telefonunuza gelen geçici kodu da girmeniz gerekir. SMS yerine Authenticator uygulamaları daha güvenlidir.",
        category: 'Savunma',
        icon: <ShieldIcon className="w-6 h-6 text-emerald-500" />,
        difficulty: 'Başlangıç'
    },
    {
        id: 202,
        title: "Password Manager",
        content: "Her site için farklı ve karmaşık şifreler kullanın. Bunları aklınızda tutmak yerine güvenli bir Parola Yöneticisi (Bitwarden, 1Password vb.) kullanın.",
        category: 'Savunma',
        icon: <LockIcon className="w-6 h-6 text-emerald-500" />,
        difficulty: 'Başlangıç'
    },
    {
        id: 203,
        title: "Yazılım Güncellemeleri",
        content: "İşletim sistemi ve uygulama güncellemeleri genellikle güvenlik açıklarını kapatır. 'Sonra Hatırlat' demek yerine hemen güncelleyin.",
        category: 'Savunma',
        icon: <CheckIcon className="w-6 h-6 text-blue-500" />,
        difficulty: 'Orta'
    },
    {
        id: 204,
        title: "3-2-1 Yedekleme Kuralı",
        content: "Verilerinizi kaybetmemek için: 3 kopya tutun, 2 farklı ortamda saklayın (Disk + USB), 1 tanesi ofis/ev dışında (Bulut) olsun.",
        category: 'Savunma',
        icon: <BookIcon className="w-6 h-6 text-indigo-500" />,
        difficulty: 'İleri'
    },

    // GİZLİLİK
    {
        id: 301,
        title: "Dijital Ayak İzi",
        content: "İnternette paylaştığınız her fotoğraf, yorum ve beğeni silinmez bir iz bırakır. Kişisel bilgilerinizi (doğum tarihi, anne kızlık soyadı) sosyal medyada paylaşmayın.",
        category: 'Gizlilik',
        icon: <BookIcon className="w-6 h-6 text-blue-500" />,
        difficulty: 'Orta'
    },
    {
        id: 302,
        title: "Metadata Temizliği",
        content: "Fotoğraflarınızda GPS konumu ve kamera bilgisi saklıdır. Sosyal medyada paylaşmadan önce bu verileri temizlemeyi unutmayın.",
        category: 'Gizlilik',
        icon: <FilterIcon className="w-6 h-6 text-purple-500" />,
        difficulty: 'İleri'
    },
    {
        id: 303,
        title: "VPN Kullanımı",
        content: "Kafe veya otel Wi-Fi ağlarına bağlanırken VPN kullanın. VPN, trafiğinizi şifreleyerek sizi gözetlenmekten korur.",
        category: 'Gizlilik',
        icon: <WifiIcon className="w-6 h-6 text-indigo-500" />,
        difficulty: 'Orta'
    }
];
