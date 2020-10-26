import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDE24UUfhMcYUXRShVKVNIjeoWKY79pPn8",
//   authDomain: "todolist201016.firebaseapp.com",
//   databaseURL: "https://todolist201016.firebaseio.com",
//   projectId: "todolist201016",
//   storageBucket: "todolist201016.appspot.com",
//   messagingSenderId: "747041832730",
//   appId: "1:747041832730:web:0a72519f971414bc0c76a3",
//   measurementId: "G-E9CBNCMM35"
// };
// firebase.initializeApp(firebaseConfig);


const TodoList = () => {

  // 初期値を定義する
  const initialPlans = [
    {
      title: 'ゆとろぎの湯　箱根温泉　アパホテル ',
      area: '宮城県 > 松島・塩竈',
      plan: '会席膳＆オープンキッチンの夕食と天然温泉「絹肌の湯」を愉しむ　季節のくつろぎプラン【スタンダード】',
      thumbnailUrl: 'https://cdn.jalan.jp/jalan/images/pictM/Y2/Y312632/Y312632589.jpg',
      price: '合計(税抜) 17,000円（17,000円/人）',
      access: 'ＪＲ東北本線松島駅下車徒歩で１５分、またはＪＲ仙石線松島海岸駅下車徒歩で１０分',
    },
    {
      title: '豆腐の湯　熱海温泉　松島宿 ',
      area: '宮城県 > 松島・塩竈',
      plan: '会席膳＆オープンキッチンの夕食と天然温泉「絹肌の湯」を愉しむ　季節のくつろぎプラン【スタンダード】',
      thumbnailUrl: 'https://cdn.jalan.jp/jalan/images/pictL/Y2/Y312632/Y312632546.jpg',
      price: '合計(税抜) 25,000円（25,000円/人）',
      access: 'ＪＲ東北本線松島駅下車徒歩で１５分、またはＪＲ仙石線松島海岸駅下車徒歩で１０分',
    },
    {
      title: 'すべすべ肌の湯　草津温泉　センチュリー２１ホテル ',
      area: '宮城県 > 松島・塩竈',
      plan: 'シンプルステイ　お食事無し素泊まりプラン',
      thumbnailUrl: 'https://cdn.jalan.jp/jalan/images/pictM/Y2/Y312632/Y312632445.jpg',
      price: '合計(税抜) 9,200円（9,200円/人）',
      access: 'ＪＲ東北本線松島駅下車徒歩で１５分、またはＪＲ仙石線松島海岸駅下車徒歩で１０分',
    },
  ]

  // 各変数の定義（state）
  const [inputTitle, setInputTitle] = useState()
  const [inputArea, setInputArea] = useState()
  const [inputPlan, setInputPlan] = useState()
  const [inputThumbnailUrl, setInputThumbnailUrl] = useState()
  const [inputPrice, setInputPrice] = useState()
  const [inputAccess, setInputAccess] = useState()
  const [planList, setPlanList] = useState(initialPlans)

  // 入力フォームに値を入力したら実行される関数
  const handleInputTitle = (e)  => {
    e.preventDefault()
    console.log('入力したテキスト', e.target.value)
    setInputTitle(e.target.value)
  }

  const handleInputThumbnailUrl = (e)  => {
    e.preventDefault()
    setInputThumbnailUrl(e.target.value)
  }

  const handleInputArea = (e) => {  
    e.preventDefault()
    setInputArea(e.target.value)
  }

  const handleInputPlan = (e) => {
    e.preventDefault()
    setInputPlan(e.target.value)
  }

  const handleInputPrice = (e) => {
    e.preventDefault()
    setInputPrice(e.target.value);
  }

  const handleInputAccess = (e) => {
    e.preventDefault()
    setInputAccess(e.target.value)
  }

  // 登録ボタンを押したら実行される関数
  const addTask = ()  => {
    // 価格の項目で数字以外の入力があったらアラートを出す
    if (!/^\d*$/.test(inputPrice)) {
      console.log('inputPriceは数字ではありません')
      alert('価格は数字で入力してください。')
      return
    }
    console.log('登録')
    // バリデーションの設定 未入力項目があったらアラートを出す
    if (!inputTitle || !inputArea) {
      console.log('inputTitleは空です。')
      alert('未入力の項目があります。')
      return
    }

    // 入力した値をセットする
    // 入力した値＝inputTitle
    const plan1 = 
      {
        title: inputTitle,
        area: inputArea,
        plan: inputPlan,
        thumbnailUrl: inputThumbnailUrl,
        price: inputPrice,
        access: inputAccess,
      }
    
    // inputTitleをplanList(配列)にセットする
    planList.push(plan1)
    setPlanList(planList)
    console.log("planListの中身",planList)

    // 入力フォームを空欄にする
    setInputTitle("")
    setInputArea("")
    setInputPlan("")
    setInputThumbnailUrl("")
    setInputPrice("")
    setInputAccess("")
  }

  return (
    <div>
      <h1>宿泊プラン</h1>
      <h2>入力項目</h2>
        <input onChange={e => handleInputTitle(e)} placeholder="タイトル" value={inputTitle} /><br />
        <input onChange={e => handleInputArea(e)} placeholder="エリア" value={inputArea} /><br />
        <input onChange={e => handleInputPlan(e)} placeholder="プラン" value={inputPlan} /><br />
        <input onChange={e => handleInputThumbnailUrl(e)} placeholder="サムネイルURL" value={inputThumbnailUrl} /><br />
        <input onChange={e => handleInputPrice(e)} placeholder="価格" value={inputPrice} /><br />
        <input onChange={e => handleInputAccess(e)} placeholder="アクセス" value={inputAccess} /><br />
      <button onClick={addTask}>登録</button>
      <h3>一覧表示</h3>
      <ul>
        { planList.map((plan, index) => (
        <li key={ index }>
          タイトル：{ plan.title }<br />
          エリア：{ plan.area }<br />
          プラン：{ plan.plan }<br />
          料金：{ plan.price }<br />
          <img src={ plan.thumbnailUrl } /><br />
          アクセス：{ plan.access }<br /><br /><br />
        </li>
        ))}
       </ul>
    </div>
  );
}

                
export default TodoList;

