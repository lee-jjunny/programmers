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
    // '다리'를 모방한 큐에 간단한 배열로 정리 : [트럭무게, 트럭이 나갈 시간].
    let time = 0;
    let qu = [[0, 0]];
    let weightOnBridge = 0;

    // 대기 트럭, 다리를 건너는 트럭이 모두 0일 때 까지 루프 반복
    while (qu.length > 0 || truck_weights.length > 0) {
        // 현재 시간과 큐 맨 앞의 차의 '나갈 시간'이 같다면, 큐에서 트럭을 제거하고, 다리 위 트럭 무게합에서도 뺌
        if (qu[0][1] === time) weightOnBridge -= qu.shift()[0];

        if (weightOnBridge + truck_weights[0] <= weight) {
            // 다리 위 무게 총합 + 대기중인 트럭의 첫 무게가 다리에 올라올수 있는 무게 이하면,
            // 다리 위 무게 업데이트
            weightOnBridge += truck_weights[0];
            // 트럭 큐에 [트럭무게, 트럭이 나갈 시간] 추가
            qu.push([truck_weights.shift(), time + bridge_length]);
        } else {
            // 3. 다음 트럭이 못올라오는 상황이면 얼른 큐의
            // 대기중인 트럭이 올라올수 없다면 큐의 첫번째 트럭이 빠질 수 있도록 시간 증가 시킴
            // if 밖에서 1 더하기 때문에 -1 해줌
            if (qu[0]) time = qu[0][1] - 1;
        }
        // 시간 업데이트
        time++;
    }
    return time;
}

/* 테스트 */
let test1 = [2, 10, [7,4,5,6]];
let test2 = [100, 100, [10]];
let test3 = [100, 100, [10,10,10,10,10,10,10,10,10,10]];

console.log('=======solution=======');
console.log('test1 >> ', solution(...test1));
console.log('test2 >> ', solution(...test2));
console.log('test3 >> ', solution(...test3));