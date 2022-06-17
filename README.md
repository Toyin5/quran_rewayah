## Quran Rewayah 7 API

#### an api for seven variations in quran

<br>
<br>

> Contributtor : [Arief]('https://github.com/saifuddien'), and [Toyin](https://github.com/Toyin5')

***

```json

{
  "github": "https://github.com/saifuddien/quran_rewayah",
  "docs": [
    {
      "desc": "Getting One Juz Of Quran.",
      "url": {
        "endpoint": "/api/quran-rewayah/juz/{number of juz}",
        "example": "https://quran-rewayah-api.vercel.app/api/quran-rewayah/juz/2"
      }
    },
    {
      "desc": "Getting All Surah Of Quran.",
      "url": {
        "endpoint": "/api/quran-rewayah/surah",
        "example": "https://quran-rewayah-api.vercel.app/api/quran-rewayah/surah"
      }
    },
    {
      "desc": "Getting One Surah Of Quran.",
      "url": {
        "endpoint": "/api/quran-rewayah/surah/<number-of-surah>",
        "example": "https://quran-rewayah-api.vercel.app/api/quran-rewayah/surah/5"
      }
    },
    {
      "desc": "Getting One Ayah Of Surah in Quran.",
      "url": {
        "endpoint": "/api/quran-rewayah/ayah/<number-of-ayah>?surah=<number-of-surah>",
        "example": "https://quran-rewayah-api.vercel.app/api/quran-rewayah/ayah/5?surah=12"
      }
    }
  ]
}

```