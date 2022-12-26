import './index.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
export default function Navigation() {
  const pathname = useLocation().pathname
  useEffect(() => {
    switch (pathname) {
      case '/':
        document.getElementById('animation-start').setAttribute('class', 'animation start-home')
        break
      case '/netEase':
        document.getElementById('animation-start').setAttribute('class', 'animation start-netEase')
        break
      case '/collect':
        document.getElementById('animation-start').setAttribute('class', 'animation start-collect')
      default:
        console.log(new Error('路径错误'))
        break
    }
  }, [pathname])
  return (
    <nav>
      <Link to="/">发现音乐</Link>
      <Link to="/netEase">网易云</Link>
      <Link to="/collect">收藏</Link>
      <a href="#">protfolio</a>
      <a href="#">contact</a>
      <div id="animation-start"></div>
    </nav>
  )
}
