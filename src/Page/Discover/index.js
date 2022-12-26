import { List, Avatar, Empty, Input, Pagination } from 'antd'
import { useState } from 'react'
import styles from './index.module.css'
import { useDispatch } from 'react-redux'
import { setloadingStatus, AddList } from '../../store/default'
import { nbsp2Space } from '../../tool'
const { Search } = Input
function Discover() {
  const [Value, setValue] = useState('')
  const [locationPage, setLocationPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const dispatch = useDispatch()
  const setLoading = state => dispatch(setloadingStatus(state))
  const addList = song => dispatch(AddList(song))
  function onChange(pageNumber) {
    setLoading(true)
    search(Value, pageNumber)
  }
  function search(value, page) {
    setSearchLoading(true)
    setValue(value)
    setLocationPage(page)
    fetch(
      process.env.REACT_APP_myMusic + '/search?search=' + value + '&number=10' + '&page=' + page,
      {
        method: 'GET',
        mode: 'cors',
      }
    )
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.data)
        setPages(data.pageNum === -1 ? 0 : data.pageNum)
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setSearchLoading(false)
        setLoading(false)
      })
  }
  function play(link, name, img, singer) {
    setLoading(true)
    fetch(process.env.REACT_APP_myMusic + '/music?link=' + link, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => {
        if (response.status !== 200) {
          return response.text()
        } else {
          return response.json()
        }
      })
      .then(data => {
        let backupImage = ''
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            backupImage = 'https://p1.nanmuxuan.com/images/52/f7382959601c115b.jpg'
            break
          case 1:
            backupImage = 'https://p1.nanmuxuan.com/images/46/b0fec79ce9038e93.jpg'
            break
          case 2:
            backupImage = 'https://p1.nanmuxuan.com/images/b6/907badeedb567405.jpg'
            break
          default:
            backupImage = 'https://p1.nanmuxuan.com/images/b1/b1ac1f3390f62cc2.jpg'
            break
        }
        if (data.musciLink === undefined) {
          alert('歌曲不存在')
        } else {
          addList({
            image: img === undefined ? backupImage : img,
            name: name,
            singer: singer,
            src: data.musciLink,
          })
        }
      })
      .catch(e => {
        if (e instanceof Error) {
          console.log(e)
        } else {
          e.then(r => console.log(r))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <h1>发现音乐</h1>
      <Search
        placeholder="请输入要搜索的内容"
        enterButton="搜索音乐"
        size="large"
        loading={searchLoading}
        onSearch={value => search(value, 1)}
      />
      <List
        style={{ display: searchResults.length === 0 ? 'none' : 'block' }}
        itemLayout="horizontal"
        dataSource={searchResults}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    item.hts_MVPIC === undefined
                      ? 'https://www.yikaojixun.com/uploads/62143ce94c0f582800cff27bf453f3bd.jpg'
                      : item.hts_MVPIC
                  }
                />
              }
              title={
                <a onClick={() => play(item.link, item.songName, item.hts_MVPIC, item.singer)}>
                  {nbsp2Space(item.songName)}
                </a>
              }
              description={'歌手：' + item.singer}
            />
          </List.Item>
        )}
      />
      <Pagination
        showQuickJumper
        current={locationPage}
        total={pages * 10}
        onChange={onChange}
        style={{ display: searchResults.length === 0 ? 'none' : 'block' }}
      />
      <Empty
        description={<span>亲😊暂时没有内容</span>}
        className={styles.empty}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ display: searchResults.length !== 0 ? 'none' : 'block' }}
      />
    </>
  )
}
export default Discover
