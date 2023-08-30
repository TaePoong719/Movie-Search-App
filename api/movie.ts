import fetch from 'node-fetch'
import { VercelRequest, VercelResponse } from '@vercel/node'

const { APIKEY } = process.env

// 노드환경에서 작동함
export default async function handler (request:VercelRequest, response:VercelResponse) {
  const { title, page, id } = JSON.parse(request.body)
  const url = id
    ? `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full` 
    : `https://omdbapi.com?apikey=${APIKEY}&s=${title}&page=${page}`
  const res = await fetch(url)
  const json = await res.json()
  response
    .status(200)
    .json(json)
}

// 서버리스 함수란 컴퓨팅 서버를 직접 구축이나 관리하지 않고 그 기능을 함수 단위로 작성해서 바로 사용할 수 있는 하나의 기능이자 서비스
// 네트워크 상태코드 : 200 이면 정상적으로 호출 된 경우 의미

// Vercel 서비스가 지원해주는 Type 을 불러와서 사용
// 보통 대부분 TS의 Interface를 제공해주니, DOCS나 NPM에서 지원되는지 확인하고 가져오면 된다.