import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [value, setValue] = useState('')
  const [urls, seturls] = useState([])
  const [downloadedUrls, setDownloadedUrls] = useState(JSON.parse(localStorage.getItem("urls")??"[]")??[])
  useEffect(() =>{
    console.log(value)
  }, [value])
  const getUrls = async () => {
    const response = await fetch('http://localhost:3000/get_content_by_url')
    let keys = await response.json()
    console.log(keys)
    seturls(keys[value])
  }
  const addUrl = (url) => {
    const localArray = JSON.parse(localStorage.getItem("urls")??"[]")
    localStorage.setItem("urls", JSON.stringify([...localArray, url]))
    setDownloadedUrls([...downloadedUrls, url])
  }

  return (
    <div className="App">
      <div>
        <input type='text' value={value} onChange={(event) => setValue(event.target.value)}/>
        <button onClick={() => getUrls()}>Поиск</button>
      </div>
      <div>
        <ul>
          {urls?.map((item)=> <li>{item} <button onClick={()=> addUrl(item)}>Загрузить</button></li>)}
        </ul>
      </div>
      <div>
        {downloadedUrls?.map((item)=> 
          <div>
            <a href={item} target='_blank'>{item} </a>
          </div>)}
      </div>
    </div>
  );
}

export default App;