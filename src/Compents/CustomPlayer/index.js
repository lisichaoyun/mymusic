import styles from './index.module.css'
import { Slider } from 'antd'
import { getInputSize } from '../../tool'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
export default function CustomPlayer() {
  const playerList = useSelector(state => state.defaultion.playerList)
  const [player] = useState(new Audio())
  const [ProgessValue, SetProgessValue] = useState(0)
  const [playingStatus, SetplayingStatus] = useState(false)
  const [ImageSrc, setImageSrc] = useState('')
  const [SongName, SetsongName] = useState('音乐名字')
  const [SongSinger, SetsongSinger] = useState('歌手')
  const [muted, Setmuted] = useState(false)
  const [Second, SetSecond] = useState(0)
  const [minute, Setminute] = useState(0)
  const [volume, Setvolume] = useState(50)
  const [Duration, SetDuration] = useState(0)
  const [index, Setindex] = useState(0)
  useEffect(() => {
    if (playerList.length > 0) {
      setImageSrc(playerList[index].image)
      SetsongName(playerList[index].name)
      SetsongSinger(playerList[index].singer)
      player.src = playerList[index].src
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])
  useEffect(() => {
    if (Duration !== 0) {
      player.addEventListener('timeupdate', () => {
        SetProgessValue((player.currentTime / Duration) * 100)
        SetSecond(Math.floor(player.currentTime % 60))
        Setminute(Math.floor(player.currentTime / 60))
      })
    }
  }, [Duration])
  useEffect(() => {
    if (playerList.length !== 0) {
      setImageSrc(playerList[playerList.length - 1].image)
      SetsongName(playerList[playerList.length - 1].name)
      SetsongSinger(playerList[playerList.length - 1].singer)
      player.src = playerList[playerList.length - 1].src
      let CustomPlayer = document.getElementById('CustomPlayer')
      CustomPlayer.style.transform = 'translate(-400px)'
      setTimeout(() => {
        CustomPlayer.style.transform = 'none'
      }, 4000)
    }
  }, [playerList])
  useEffect(() => {
    let CustomPlayer = document.getElementById('CustomPlayer')
    let tooltiptext = document.getElementsByClassName(styles.tooltiptext)[0]
    CustomPlayer.addEventListener('mouseover', () => {
      CustomPlayer.style.transform = 'translate(-400px)'
      tooltiptext.setAttribute('style', 'transform: translate(-400px)')
    })
    CustomPlayer.addEventListener('mouseout', () => {
      CustomPlayer.style.transform = 'none'
      tooltiptext.removeAttribute('style')
    })
    player.autoplay = true
    player.volume = 0.5
    let ProgressPlayer = document.getElementById('progress-player')
    ProgressPlayer.addEventListener('mousedown', event => {
      let x = event.clientX
      let left = ProgressPlayer.getBoundingClientRect().left
      let width = ProgressPlayer.offsetWidth
      let value = (x - left) / width
      player.currentTime = value * player.duration
      SetProgessValue(value)
      if (player.paused === true) {
        player.play()
        SetplayingStatus(true)
      }
    })
    player.addEventListener('play', () => {
      SetplayingStatus(true)
    })
    player.addEventListener('pause', () => {
      SetplayingStatus(false)
    })
    player.addEventListener('loadedmetadata', () => {
      //音频加载完毕事件
      SetDuration(player.duration)
    })
    player.addEventListener('ended', () => {
      SetplayingStatus(false)
      SetSecond(0)
      Setminute(0)
      SetProgessValue(0)
    })
    player.addEventListener('error', () => {
      SetplayingStatus(false)
      console.log('加载错误')
    })
    document.addEventListener('keyup', e => {
      switch (e.code) {
        case 'Space':
          if (player.paused===true) {
            player.play()
          } else {
            player.pause()
          }
          break
        case 'ArrowDown':
          onChange(player.volume*100-10<0?0:player.volume*100-10)
          break
        case 'ArrowUp':
          onChange(player.volume*100+10>100?100:player.volume*100+10)
          break
      }
    })
  }, [])
  function onChange(value) {
    Setvolume(value)
    player.volume = value / 100
    if (value === 0) {
      player.muted = true
      Setmuted(true)
    } else {
      player.muted = false
      Setmuted(false)
    }
  }
  function Play() {
    if (playingStatus === false) {
      player.play()
    } else {
      player.pause()
    }
  }
  function setmuted() {
    if (muted === false) {
      player.muted = true
      Setmuted(true)
    } else {
      player.muted = false
      Setmuted(false)
    }
  }
  function next() {
    if (playerList.length - 1 > index) {
      Setindex(index + 1)
    } else {
      Setindex(0)
    }
  }
  function back() {
    if (index === 0) {
      Setindex(playerList.length - 1)
    } else {
      Setindex(index - 1)
    }
  }
  const PlayerImage = useMemo(() => {
    return (
      <div className={styles.PlayerImage}>
        <img src={ImageSrc} className={styles.img} />
      </div>
    )
  }, [ImageSrc])
  const text = useMemo(() => {
    return (
      <span className={styles.text} title={'曲名:' + SongName + '\t歌手:' + SongSinger}>
        <p className={styles.SongName_player}>
          {getInputSize(SongName) > 15 ? SongName.substring(0, 14) + '...' : SongName}
        </p>
        <p className={styles.SongName_player}>
          {getInputSize(SongSinger) > 8 ? SongSinger.substring(0, 6) + '...' : SongSinger}
        </p>
      </span>
    )
  }, [SongName, SongSinger])
  const playericon = useMemo(() => {
    return (
      <button onClick={Play} className={styles.button}>
        {playingStatus === false ? (
          <i className={styles.iconfont}>&#xea82;</i>
        ) : (
          <i className={styles.iconfont}>&#xea81;</i>
        )}
      </button>
    )
  }, [playingStatus])
  const mutedicon = useMemo(() => {
    return (
      <button onClick={setmuted} className={styles.button}>
        {muted === false ? (
          <i className={styles.iconfont} style={{ fontSize: '24px' }}>
            &#xe600;
          </i>
        ) : (
          <i className={styles.iconfont} style={{ fontSize: '24px' }}>
            &#xe63e;
          </i>
        )}
      </button>
    )
  }, [muted])
  const PlayerSlider = useMemo(
    () => <Slider value={volume} onChange={onChange} className={styles.PlayerSlider} />,
    [volume]
  )
  const PlayerProgress = useMemo(
    () => (
      <progress
        max={100}
        value={ProgessValue}
        className={styles.PlayerProgress}
        id="progress-player"
      />
    ),
    [ProgessValue]
  )
  const PlayerTime_Duration = useMemo(() => {
    return (
      (Math.floor(Duration / 60) < 10
        ? '0' + Math.floor(Duration / 60)
        : Math.floor(Duration / 60)) +
      ':' +
      (Math.floor(Duration % 60) < 10 ? '0' + Math.floor(Duration % 60) : Math.floor(Duration % 60))
    )
  }, [Duration])
  const PlayerTime_Current = useMemo(() => {
    return (minute < 10 ? '0' + minute : minute) + ':' + (Second < 10 ? '0' + Second : Second)
  }, [minute, Second])
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltiptext}>把鼠标放在我这边或者点击我</span>
      <div id="CustomPlayer" className={styles.CustomPlayer}>
        <div className={styles.PlayerTop}>
          {PlayerImage}
          <div className={styles.PlayerControler}>
            {text}
            <div className={styles.control_buttons}>
              {playericon}
              <button onClick={back} className={styles.button}>
                <i className={styles.iconfont}>&#xea83;</i>
              </button>
              <button onClick={next} className={styles.button}>
                <i className={styles.iconfont}>&#xe647;</i>
              </button>
              {mutedicon}
              {PlayerSlider}
            </div>
          </div>
        </div>
        {PlayerProgress}
        <div className={styles.PlayerBottom}>
          <div className={styles.PlayerTimer}>{PlayerTime_Current}</div>
          <div className={styles.PlayerTimer_end}>{PlayerTime_Duration}</div>
        </div>
      </div>
    </div>
  )
}
