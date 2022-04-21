import imgd from '@/assets/home/c4.jpg'
import imge from '@/assets/home/c3.jpg'
import imgf from '@/assets/home/c2.jpg'
import imgg from '@/assets/home/c5.jpg'
import imgh from '@/assets/home/1.jpg'
import imgi from '@/assets/home/3.jpg'
import imgj from '@/assets/home/c7.jpg'
import imgk from '@/assets/home/c9.jpg'
import imgl from '@/assets/home/c10.jpg'
import imgm from '@/assets/home/7.jpg'
import imgn from '@/assets/home/4.jpg'
import imgo from '@/assets/home/5.jpg'
import imgp from '@/assets/home/6.jpg'
import imgq from '@/assets/home/644.jpg'
import imgr from '@/assets/home/645.jpg'
import imga from '../assets/home/641.jpg'
import imgb from '../assets/home/642.jpg'
import imgc from '../assets/home/643.jpg'

const list = [
  {
    kind: '心情随笔',
    date: '04 / 11',
    num: 1,
    title: '向海风许愿在山海相见',
    img: [imga, imgb, imgc],
  },
  {
    kind: '美食分享',
    num: 2,
    date: '03 / 16',
    title: '今日份快乐',
    img: [imgd, imge, imgf, imgg],
  },
  {
    kind: '旅游日记',
    num: 3,
    date: '01 / 27',
    title: '等风来,不如追风去。',
    img: [imgh, imgi],
  },
  {
    kind: '美食分享',
    num: 2,
    date: '09 / 20',
    title: '人间烟火气 最抚凡人心',
    img: [imgj, imgk, imgl],
  },
  {
    kind: '旅游日记',
    num: 3,
    date: '11 / 05',
    title: '有趣的人生一半是山川湖海',
    img: [imgm, imgn, imgo, imgp],
  },
  {
    kind: '心情随笔',
    num: 1,
    date: '07 / 19',
    title: '早点睡觉，不抱月亮，不抱希望。',
    img: [imgq, imgr],
  },
]

export default function getCardData() {
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(list)
      }, 2000)
    } else {
      reject()
    }
  })
}
