var twoSum = function(nums, target) {
    for(var i = 0; i< nums.length; i++) {
        const otherNum = target - nums[i];
        const otherIndex = nums.indexOf(otherNum);
        if(otherIndex !== -1) {
            return [i, otherIndex];
        }
    }
    
};
var result = twoSum([2,7,11,15], 9);
console.log(result, 'result');