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

/* 다른 사람의 풀이 - 이해해보기... */
function solution2(genres, plays) {
    var dic = {};
    genres.forEach((genre,i)=> {
        dic[genre] = dic[genre] ?  dic[genre] + plays[i] :plays[i];        
    });

    var dupDic = {};
    return genres          
          .map((genre,i)=> ({genre : genre, count:plays[i] , index:i}))
          .sort((a,b)=>{               
               if(a.genre !== b.genre) return dic[b.genre] - dic[a.genre];
               if(a.count !== b.count) return b.count - a.count;
               return a.index - b.index;
           })
           .filter(genre=>  {
               if(dupDic[genre.genre] >= 2) return false;
               dupDic[genre.genre] = dupDic[genre.genre] ? dupDic[genre.genre]+ 1 : 1;
               return true;
            })
           .map(genre=> genre.index);    
}

/* 테스트 */
let test1 = [["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]];

console.log('=======solution=======');
console.log('test1 >> ', solution(...test1));
console.log('test2 >> ', solution2(...test1));