<template>
  <h1>{{raceData.jpn_date}} {{raceData.place}}{{raceData.race_num}}R</h1>
  <div>
    <p><b>■4コーナーから直線における馬群の位置どり</b></p>
    <label for="in"><input type="radio" name="trackbias_course" id="in" v-model="in_trackbias_course" value=1>インコース寄り <a href="https://race.netkeiba.com/race/movie.html?race_id=202006050112">（サンプル）</a></label>
    <label for="normal"><input type="radio" name="trackbias_course" id="middle" v-model="in_trackbias_course" value=2>内外偏りなし <a href="https://race.netkeiba.com/race/movie.html?race_id=202110010111">（サンプル）</a></label>
    <label for="bad"><input type="radio" name="trackbias_course" id="out" v-model="in_trackbias_course" value=3>やや外より <a href="https://race.netkeiba.com/race/movie.html?race_id=202106010811">（サンプル）</a></label>
    <label for="morebad"><input type="radio" name="trackbias_course" id="moreout" v-model="in_trackbias_course" value=4>大きく外より <a href="https://race.netkeiba.com/race/movie.html?race_id=202005050911">（サンプル）</a></label>
    
  </div>
  <div>
    <p><b>■上位の着順の馬の位置どり（どのコースをとった馬がよく伸びたか）</b></p>
    <label for="in"><input type="radio" name="trackbias_racestyle" id="in" v-model="in_trackbias_racestyle" value=1>インコース寄り <a href="https://race.netkeiba.com/race/movie.html?race_id=202010010509">（サンプル）</a></label>
    <label for="normal"><input type="radio" name="trackbias_racestyle" id="middle" v-model="in_trackbias_racestyle" value=2>内外偏りなし</label>
    <label for="bad"><input type="radio" name="trackbias_racestyle" id="out" v-model="in_trackbias_racestyle" value=3>やや外より</label>
    <label for="morebad"><input type="radio" name="trackbias_racestyle" id="out" v-model="in_trackbias_racestyle" value=4>大きく外より <a href="https://race.netkeiba.com/race/movie.html?race_id=202106010811">（サンプル）</a></label>
    
  </div>
  <div>
    <h4>●チェック項目</h4>
    <p class='checkitem'>■１着馬の馬番を選択</p>
    <select v-model="selectfirst" class='checkitem'>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
        <option>13</option>
        <option>14</option>
        <option>15</option>
        <option>16</option>
        <option>17</option>
        <option>18</option>
    </select>
    <p class='checkitem'>■２着馬の馬番を選択</p>
    <select v-model="selectsecond" class='checkitem'>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
        <option>13</option>
        <option>14</option>
        <option>15</option>
        <option>16</option>
        <option>17</option>
        <option>18</option>
    </select>
    <div>
        <button class='nextbtt' v-on:click="goNextRace">次へ</button>
        <p>{{selectfirst}} : {{raceData.first}}</p>
        <p>{{selectsecond}} : {{raceData.second}}</p>
        <p>{{in_trackbias_course}}</p>
        <p>{{in_trackbias_racestyle}}</p>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import config from '../config.js'
import tool from '../util/tool.js'

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
      return {
          test: 'aaa',
          raceData: {
            id: 0,
            date: 20000000,
            place: '',
            race_num: 0,
            course: '',
            trackbias_course: 0,
            trackbias_racestyle: 0,
            first: 0,
            second: 0,
            year: '',
            month: '',
            day: '',
            jpn_date: ''
          },
          selectfirst: 0,
          selectsecond: 0,
          in_trackbias_course: 0,
          in_trackbias_racestyle: 0
      }
  },
  beforeMount () {
    this.getLatestData()
  },
  methods: {
    getLatestData: function(){
      // 入力を初期化
      this.in_trackbias_course = 0;
      this.in_trackbias_racestyle = 0;
      this.selectfirst = 0,
      this.selectsecond = 0;
      // データ取得
      axios.get(config.api + '/trackbias/v1/annotation/getLatestData', {withCredentials: true})
        .then(response => {this.setData(response)})
        .catch(err => console.log(err))
    },
    setData: function(res){
      let race = res.data.data
      this.raceData.id = race.id
      this.raceData.date = race.date
      this.raceData.place = tool.replaceDubbleQw(race.place)
      this.raceData.race_num = race.race_num
      this.raceData.course = race.course
      this.raceData.trackbias_racestyle = race.trackbias_racestyle
      this.raceData.trackbias_course = race.trackbias_course
      this.raceData.first = race.first
      this.raceData.second = race.second
    //   this.raceData.year = String(this.raceData.date).substr(0,4)
    //   this.raceData.month = String(this.raceData.date).substr(4,2)
    //   this.raceData.day = String(this.raceData.date).substr(6,2)
      this.raceData.jpn_date = tool.getJpnDate(this.raceData.date)
    },
    goNextRace: function(){
      if (!this.checkCorrectRace()) return
      const params = new URLSearchParams();
      params.append('id', this.raceData.id);
      params.append('bias_course', this.in_trackbias_course);
      params.append('bias_style', this.in_trackbias_racestyle);
      axios.post(config.api + '/trackbias/v1/annotation/register', params, {withCredentials: true})
        .then(() => {this.getLatestData()})
        .catch(err => console.log(err))
      this.scrollToTop();
    },
    checkCorrectRace: function(){
        if (this.selectfirst != this.raceData.first || 
          this.selectsecond != this.raceData.second ) {
              alert('１着または２着の馬の番号が間違っています。レース結果をご確認ください。\n同着の場合は番号を入れ替えてみてください。');
              return false
          }
          if (this.in_trackbias_course == 0 || 
          this.in_trackbias_racestyle == 0 ) {
              alert('データを入力してください。');
              return false
          }
          return true
    },
    scrollToTop() {
      window.scrollTo(0,0);
   }
  }
}
</script>

<style type="text/css">
    div {
      padding: 20px;
      padding-left: 100px;
    }
    p {
        display: flex;
    }
    h4 {
        display: flex;
    }
    select {
        width: 100px;
    }
    /*input[name='trackbias_course'] {*/
    /*  display: flex;*/
    /*  justify-content: space-evenly;*/
    /*}*/
    label {
      display: flex;
    }
    a {
      display: flex;
    }
    .checkitem{
        display: flex;
    }
    .nextbtt{
        justify-content: flex-end;
        width: 70px
    }
</style>