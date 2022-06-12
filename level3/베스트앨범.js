/**
 * [ 문제 설명 ]
 * 스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다.
 * 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.
 * 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
 * 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
 * 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
 * 노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때,
 * 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.
 */

/**
 * [ 제한사항 ]
 * genres[i]는 고유번호가 i인 노래의 장르입니다.
 * plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
 * genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.\
 * 장르 종류는 100개 미만입니다.
 * 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
 * 모든 장르는 재생된 횟수가 다릅니다.
 */

 function solution(genres, plays) {
    let obj = {};
    let countObj = new Map();
    let orderByList = [];
    let resultArr = [];

    // 장르별로 구분 및 장르별 재생 횟수 obj 생성
    for(let i=0; i<genres.length; i++) {
        obj[genres[i]] = [ ...obj[genres[i]]||[], [i, plays[i]]];
        countObj.set(genres[i], (countObj.get(genres[i])||0) + plays[i]);
    }
    
    // 플레이 횟수가 많은 장르 순으로 정렬
    orderByList = [...countObj].sort((a, b) => b[1] - a[1]).map(([genre, count])=>{return genre});

    // 장르별 최대 2개의 곡을 결과 배열에 push
    orderByList.forEach((genre)=>{
        obj[genre].sort((a, b)=>b[1] - a[1]).forEach(([songNb, count], index) => {
            if(index < 2) resultArr.push(songNb);
        });
    })

    return resultArr;
}

/* 다른 사람의 풀이 - 이해해보기 */
function solution2(genres, plays) {
    var countObj = {}; // 장르별 재생 횟수를 담은 객체
    
    genres.forEach((genre,i)=> {
        // countObj에 장르 키가 이미 있으면 기존 값에 play값을 누적, 아니면 play 값 새로 등록
        countObj[genre] = countObj.hasOwnProperty(genre) ? countObj[genre] + plays[i] : plays[i];        
    });

    var bestObj = {}; // 베스트 앨범에 수록된 장르의 갯수를 담은 객체
    return  genres.map((genre,i)=> ({genre: genre, count: plays[i], index: i}))
            .sort((v1, v2) => {
                // 비교대상의 장르가 다른 경우, 장르 재생 횟수 내림차순으로 정렬 (재생 횟수가 큰 장르 우선)
                if(v1.genre !== v2.genre) return countObj[v2.genre] - countObj[v1.genre];
                // 장르는 같지만 노래 재생 횟수가 다른 경우, 노래 재생 횟수 내림차순으로 정렬 (재생 횟수가 큰 노래 우선)
                if(v1.count !== v2.count) return v2.count - v1.count;
                // 장르도 같고 재생 횟수도 같은 경우, 노래 고유번호 오름차순으로 정렬 (고유 번호가 낮은 노래 우선)
                return v1.index - v2.index;
            })
            .filter((songInfo) => {
                // 베스트 앨범에 해당 장르의 곡이 이미 2곡 수록 되어 있으면, 더이상 베스트 앨범에 수록하지 않음
                if(bestObj[songInfo.genre] >= 2) return false;
                // 베스트 앨범에 해당 장르의 곡이 수록되어 있으면 1 증가, 아니면 해당 장르 값에 1로 초기화
                bestObj[songInfo.genre] = bestObj.hasOwnProperty(songInfo.genre) ? bestObj[songInfo.genre] + 1 : 1;
                // 베스트 앨범에 수록하기 위해 true 반환
                return true;
            })
            // 베스트 앨범에 들어갈 노래의 고유번호만 리턴
           .map((songInfo) => { return songInfo.index });
}

/* 테스트 */
let test1 = [["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]];

console.log('=======solution=======');
console.log('test1 >> ', solution(...test1));
console.log('test2 >> ', solution2(...test1));