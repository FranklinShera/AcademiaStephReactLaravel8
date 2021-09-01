module.exports = {
  purge:{
      enabled: true,
      content: [
          './resources/**/*.{js,jsx,ts,tsx}',
          './resources/views/**/*.blade.php'
      ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        paypal:{
          1: "#3b7bbf"
        },facebook:{
          1: "#4267B2"
        },
          google:{
          1: "#DB4437",
        },
          github:{
          1: "#333333",
          2: "#fafafa",
          3: "#f5f5f5",
        },
        aswhite:{
          1: '#ffffffef',
          2: '#cccccc55',
        },
        primary: {
          1: "#F27323",
          2:  "#FAA63B",
          3:  "#6989ff",
          4:  "#00b985",
        },
        dark:  {
          1: "#111111",
          2:  "#707070",
          3:  "#727272",
          4:  "#2B2B2B",
          5:  "#141414",
          6:  "#BCBCBC",
        },
        input: "#f2f2f2",
        palbrown: "#54433a",
        palbrowner: "#402e32",
        palblue: "#5f89ff",
        palbluelight: "#6989ff22",
        palhighlight: "#ebf6f7",
        asgreen:  "#1DD400",

      },
      spacing: {
        '5/100': '5%',
        '10/100': '10%',
        '15/100': '15%',
        '20/100': '20%',
        '22/100': '22%',
        '30/100': '30%',
        '35/100': '35%',
        '45/100': '45%',
        '55/100': '55%',
        '65/100': '65%',
        '75/100': '75%',
        '85/100': '85%',
        '95/100': '95%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
