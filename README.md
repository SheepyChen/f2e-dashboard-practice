# 簡易Dashboard製作
# 完成作品網址：https://f2e-exam-sheepychen.vercel.app/

## 實作過程：

1.串接api拿資料 確認資料格式 建git repositoru

備註：
由於政府的api直接fetch會有cors的問題，原本在本機開發使用http-proxy-middleware
但使用Render發布proxy server會拿不到資料，所以改成先下載幾個年度的資料再用server讀取

2.切版：完成雛形

3.詳細功能製作：

ex:
submit disable
selector 換成autocomplete
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
說明：
* Submit button: All fields must be selected, otherwise, the button should be disabled
* The selection menus for "縣/市" and "區", need to use autocomplete selector to help users quickly find the desired option
* The selection menu for "區" is disabled until "縣/市" is selected
* When the selection for "縣/市" changes, the value for "區" should be cleared

* Submit and Send Request:
  - Based on the values of "年", "縣/市", and "區", redirect to a new URL/page and send an API request
  - While waiting for the API response, there should be a UI prompt indicating that the page is loading
  - Users can also trigger the query by entering "年", "縣/市", and "區" directly into the URL

* Charts:
The charts example in Figma are images because there are no restrictions on how they should be implemented, but we recommend Highcharts
* RWD:
In Figma, only two sizes are specified, so the general principle for implementing other screen sizes is to avoid breaking the layout


