import styles from './index.module.css'
import { useState } from 'react'
import { Drawer, Avatar } from 'antd'
import { useDispatch } from 'react-redux'
import { AddList, setloadingStatus } from '../../store/default'
export default function MyPlaylist(props) {
  const [visible, setVisible] = useState(false)
  const [Songs, setSongs] = useState([])
  const dispatch = useDispatch()
  const addList = song => dispatch(AddList(song))
  const setLoding = state => dispatch(setloadingStatus(state))
  function getMusicList(id, e) {
    setLoding(true)
    fetch(process.env.REACT_APP_Netease_CloudMusic + '/playlist/track/all' + '?id=' + id, {
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          e.nativeEvent.stopImmediatePropagation() // 阻止原生click事件冒泡，让drawer不关闭的同时修改children
          setVisible(true)
          setSongs(data.songs)
        } else {
          console.log(data)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoding(false)
      })
  }
  async function play(id, img, name, singer) {
    setLoding(true)
    let check = await fetch(
      process.env.REACT_APP_Netease_CloudMusic + '/check/music' + '?id=' + id,
      { credentials: 'include', mode: 'cors', method: 'GET' }
    ).then(response => response.json())
    if (check.success === true) {
      fetch(process.env.REACT_APP_Netease_CloudMusic + '/song/url' + '?id=' + id, {
        credentials: 'include',
        mode: 'cors',
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            let url = data.data[0].url
            addList({
              image: img,
              name: name,
              singer: singer,
              src: url,
            })
          } else {
            alert('播放失败')
          }
        })
    } else {
      alert('该歌曲暂时无法播放，请稍后再试！')
    }
  }
  return (
    <>
      <h3 className={styles.header_title}>网易云音乐歌单</h3>
      <ul className={styles.playerlist}>
        {props.playerlist.map((item, index) => {
          return (
            <li
              key={index}
              title={item.name}
              className={styles.li}
              style={{ backgroundImage: `url(${item.coverImgUrl})` }}
              onClick={Event => getMusicList(item.id, Event)}
            >
              <span className={styles.text}>{item.name}</span>
            </li>
          )
        })}
      </ul>
      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        mask={false}
        placement="left"
        title="歌曲列表"
      >
        <ul>
          {Songs.map((item, index) => {
            return (
              <li
                key={index}
                className={styles.songname}
                title={item.name}
                onClick={() =>
                  play(item.id, item.al.picUrl, item.name, item.ar[0].name).finally(() => {
                    setLoding(false)
                  })
                }
              >
                <Avatar
                  style={{
                    verticalAlign: 'middle',
                  }}
                  src={item.al.picUrl}
                  shape="square"
                  size="large"
                ></Avatar>
                {item.name}
              </li>
            )
          })}
        </ul>
      </Drawer>
    </>
  )
}
