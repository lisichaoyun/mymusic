import { useEffect, useState, useRef } from 'react'
import MyPlaylist from '../../Compents/MyPlaylist'
import { useDispatch } from 'react-redux'
import { setloadingStatus } from '../../store/default'
function Home() {
  const [playerlist, setPlayerlist] = useState([])
  const [UserId, setUserId] = useState(undefined)
  const dispatch = useDispatch()
  const setLoading = state => dispatch(setloadingStatus(state))
  useEffect(() => {
    setLoading(true)
    fetch(process.env.REACT_APP_Netease_CloudMusic + '/login/status', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        if (data.data.code === 200) {
          if(data.data.account===null){
            setUserId(null)
          }else{
            setUserId(data.data.account.id)
          }
        } else {
          alert(data.data.code)
          console.log(data.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  useDidUpdateEffect(() => {
    Netease()
  }, [UserId])
  function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false)
    useEffect(() => {
      if (didMountRef.current) fn()
      else didMountRef.current = true
    }, inputs)
  }
  function Netease() {
    if (UserId === null) {
      let account = window.prompt('请输入网易云音乐手机账号：')
      let password = window.prompt('请输入网易云音乐密码：')
      setLoading(true)
      fetch(process.env.REACT_APP_Netease_CloudMusic + '/login/cellphone', {
        //登录接口
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
        },
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          phone: account,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            setUserId(data.account.id)
            getlist(data.account.id)
          } else {
            alert('登录失败，请检查账号密码是否正确！')
            console.log(data)
          }
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      getlist(UserId) 
    }
  }
  function getlist(id) {
    setLoading(true)
    fetch(process.env.REACT_APP_Netease_CloudMusic + '/user/playlist' + '?uid=' + id, {
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          setPlayerlist(data.playlist)
        } else {
          console.log(data)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <MyPlaylist playerlist={playerlist} />
    </>
  )
}
export default Home
