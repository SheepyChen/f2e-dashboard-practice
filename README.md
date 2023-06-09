# 簡易資料Dashboard製作
# 完成作品網址：https://f2e-exam-sheepychen.vercel.app/

## 使用說明：
可以依據選擇的年份及縣市地區，拿到對應年份的資料，產生不同生活型態（共同vs獨立）的性別統計長條圖，及各生活型態加總的圓餅圖。
- 目前資料只提供109-111年度及幾個縣市可以選擇
- 亦可以直接輸入對應的網址進行查詢，例如：https://f2e-exam-sheepychen.vercel.app/110/新北市/板橋區

## 實作過程：

1.串接api拿資料 確認資料格式 建git repository

備註：
由於政府的api直接fetch會有cors的問題，原本在本機開發使用http-proxy-middleware
（更新:由於網址錯誤導致，改endpoint就不會）

先下載幾個年度的資料再透過Render建置server讀取(https://government-data.onrender.com/110)

2.切版
依據提供的Figma完成切版雛形。

3.詳細功能製作：

ex:
submit disable 
selector 換成 autocomplete
縣市還沒有選區disable
年份不同重送api
loading ui
RWD設計

4.Deploy proxy server & use vercel to live demo
https://f2e-exam-sheepychen.vercel.app/


## 製作Requirements:

1. 請使用React
2. Follow Airbnb coding style
3. 將程式碼commit 至GitHub
4. 請以live demo做呈現 (Heroku, Vercel, CodeSandbox, GCP, etc.)
5. Typescript 加分
6. 可使用第三方套件
7. Input group

