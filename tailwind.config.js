module.exports = {
  mode: 'jit',
  content: 
    ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        audimat: ["Audimat"],
        sohne: ["Sohne"],
      },
      colors: {
        aws: '#FF9900',
        ldblue: '#3DD6F5',
        lddblue: '#405BFF',
        ldred: '#FF386B',
        ldpurple: '#A34FDE',
        ldyellow: '#EBFF38',
        ldgray: '#282828',
        ldgraytext: '#BCBEC0',
        ldhl: '#EBFF38',
        ldgdcol1: '#DEE8C8',
        ldgdcol2: '#A7B6EA',
        ldinput: '#212121',
        ldinputback: '#282828'
      },
      backgroundImage: {
        'ldls': "url('../public/LightSpeed_bg.png')",
        'ldspotsgray': "url('../public/ld-bg-gray.png')",
        'ldspotsyellow': "url('../public/ld-bg-yellow.png')",
        'ldbg': "url('../public/ld-bg.png')"
      },
    },
  },
  plugins: [],
}
