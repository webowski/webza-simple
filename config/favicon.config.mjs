import favicons from 'favicons';

export default {
  path: "/images/favicon/",
  appName: "Webza",
  appShortName: "App",
  appDescription: "Минимальный набор иконок",
  developerName: null,
  developerURL: null,
  background: "transparent",
  theme_color: "transparent",
  icons: {
    favicons: false,
    favicons: {
      offset: 0,       // по желанию
      // background: "#FFFF2F",
      transparent: true
    },
    // android: {
    //   // только самые нужные размеры
    //   sizes: [192, 512]
    // },
    // appleIcon: {
    //   // только современные размеры iOS
    //   sizes: [180]
    // },
    // windows: {
    //   // можно оставить стандартный квадрат
    //   background: "#FFFF2F"
    // },
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    firefox: false,
    windows: false,
    yandex: true
  }
};
