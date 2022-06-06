/**
 * [ 문제 설명 ]
 * 수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.
 * 마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때,
 * 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.
 */

/**
 * [ 제한사항 ]
 * 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
 * completion의 길이는 participant의 길이보다 1 작습니다.
 * 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
 * 참가자 중에는 동명이인이 있을 수 있습니다.
 */

/* Object 사용 */
function solution1(participant, completion) {
    let resultObj = {};
    let result = ''

    participant.forEach((key)=>{ resultObj[key] = (resultObj[key]||0) + 1; });

    completion.forEach((key)=>{ resultObj[key] = resultObj[key] - 1; });

    result = Object.keys(resultObj).find((key)=>{return resultObj[key] > 0});

    return result;
}

/* Map 사용 */
function solution2(participant, completion) {
    let resultMap = new Map();
    
    participant.forEach((name) => { resultMap.set(name, (resultMap.get(name) || 0) + 1); });

    completion.forEach((name) => { resultMap.set(name, (resultMap.get(name) || 0) - 1); });
    
    for(let [k, v] of resultMap){
        if(v > 0) return k;
    }
    
    return 'no answer';
}

/* 테스트 */
let test1 = [["leo", "kiki", "eden"], ["eden", "kiki"]];
let test2 = [["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"]];
let test3 = [["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"]];

console.log('=======solution1=======');
console.log('test1 >> ', solution1(test1[0], test1[1]));
console.log('test2 >> ', solution1(test2[0], test2[1]));
console.log('test3 >> ', solution1(test3[0], test3[1]));
console.log('=======solution2=======');
console.log('test1 >> ', solution2(test1[0], test1[1]));
console.log('test2 >> ', solution2(test2[0], test2[1]));
console.log('test3 >> ', solution2(test3[0], test3[1]));