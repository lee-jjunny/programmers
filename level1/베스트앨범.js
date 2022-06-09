/**
 * [ 문제 설명 ]
 * 스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.
 * 예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면
 * 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.
 * 스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.
 */

/**
 * [ 제한사항 ]
 * clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
 * 스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
 * 같은 이름을 가진 의상은 존재하지 않습니다.
 * clothes의 모든 원소는 문자열로 이루어져 있습니다.
 * 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.
 * 스파이는 하루에 최소 한 개의 의상은 입습니다.
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