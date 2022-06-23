/**
 * [ 문제 설명 ]
 * 트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다.
 * 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다.
 * 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며, 다리는 weight 이하까지의 무게를 견딜 수 있습니다.
 * 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.
 * solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length,
 * 다리가 견딜 수 있는 무게 weight,트럭 별 무게 truck_weights가 주어집니다.
 * 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.
 */

/**
 * [ 제한사항 ]
 * bridge_length는 1 이상 10,000 이하입니다.
 * weight는 1 이상 10,000 이하입니다.
 * truck_weights의 길이는 1 이상 10,000 이하입니다.
 * 모든 트럭의 무게는 1 이상 weight 이하입니다.
 */

 function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    let nowWeight = 0;
    let result = [];

    truck_weights.forEach((value) => {
        nowWeight+=value;
        if(result)
        result.push(value);

        
    })
    

    return answer;
}

/* 테스트 */
let test1 = [2, 10, [7,4,5,6]];
let test2 = [100, 100, [10]];
let test3 = [100, 100, [10,10,10,10,10,10,10,10,10,10]];

console.log('=======solution=======');
console.log('test1 >> ', solution(...test1));
console.log('test2 >> ', solution(...test2));
console.log('test3 >> ', solution(...test3));