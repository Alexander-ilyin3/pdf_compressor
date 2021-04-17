module.exports = async () => {
  return new Promise((rs,rj) => {
    setTimeout(()=> {
      rs([
        {
          name: '5f94dcc6-0810-4208-9593-84824c8a4fac.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
          path: 'C:\\Users\\Qitpess\\Desktop\\pic_nadya\\5f94dcc6-0810-4208-9593-84824c8a4fac.__CR0,0,1464,600_PT0_SX1464_V1___.jpg'
        },
        {
          name: '7f3abfa5-9b26-4a20-9df5-901e7385a555.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
          path: 'C:\\Users\\Qitpess\\Desktop\\pic_nadya\\7f3abfa5-9b26-4a20-9df5-901e7385a555.__CR0,0,1464,600_PT0_SX1464_V1___.jpg'
        },
        {
          name: '55EF5G-07-Variety-of-Curvature-for-Landmarks-Curvable-OLED-OLED-Signage-ID-D.jpg',
          path: 'C:\\Users\\qitpe\\Desktop\\55EF5G-07-Variety-of-Curvature-for-Landmarks-Curvable-OLED-OLED-Signage-ID-D.jpg'
        },
        {
          name: 'photo_2021-04-01_23-12-38.jpg',
          path: 'C:\\Users\\qitpe\\Desktop\\photo_2021-04-01_23-12-38.jpg'
        }
      ])
    }, 100)
  })
}
