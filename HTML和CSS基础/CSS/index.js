var findMedianSortedArrays = function(nums1, nums2) {
    const nums1Len = nums1.length;
    const nums2Len = nums2.length;
    if(nums1Len + nums2Len === 2) {
        return (nums1[0] + nums2[0]) / 2;
    }
    if(nums1Len + nums2Len === 3) {
        return nums1[0] >= nums2[0] ? nums1[0] : nums2[0];
    }
    const p = 0;
    const pp = nums1.length - 1;
    const q = 0;
    const qq = nums2.length - 2;
    if(!nums1[p]){
        
    }
};