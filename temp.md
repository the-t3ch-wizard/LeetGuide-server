**Brute Force Approach:**  Defines two pointers, one that iterates from the beginning of an array, and the other from the end of the array, if the sum is greater than the target, decrement the right pointer, if the sum is less than the target, increment the left pointer, continue until the two pointers meet. If two pointers did not meet and the sum of two numbers does not equal to the target return -1. \n\n
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[] { -1, -1 };
    }
}
```

**Optimal Approach (Using HashTable):**
Utilizes a hash table that stores the difference between the target value and current value. If the value is already in a hash table, return the indices of the two numbers. Otherwise, store the current value in a hash table.
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] { -1, -1 };
    }
}
```