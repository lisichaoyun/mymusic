import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import styles from './index.module.css'
import './index.css'
import { useEffect } from 'react'
export default function Loding() {
  const loading = useSelector(state => state.defaultion.loadingStatus)
  useEffect(() => {
    if (loading) {
      document.getElementById('loading').style.display='block'
    } else {
      document.getElementById('loading').style.display='none'
    }
  }, [loading])
  return (
    <>
      <Spin tip="等待请求返回..." spinning={loading} className={styles.mask}></Spin>
    </>
  )
}
