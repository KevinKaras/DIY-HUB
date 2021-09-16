let list1 = [1, 2, 4]
let list2 = [1, 3, 4]





var mergeTwoLists = function(l1, l2) {
    
    let returnList = l1
    
    
    for(let i = 0; i < l1.length; i++){
    
        let cur = l2[i]     
    
        for(let j = 0; j < returnList.length; j++){
            
            
        
            if(returnList[j] === cur || returnList[j] < cur){
            
            
                returnList.splice(j+1,0,cur)
                
            
            }
        
            if(returnList[j] > cur){
            
            
                returnList.splice(j-1,0,cur)
                
            
            }
        
        
        }
    
    
    
    
    
    }    
    
    return returnList
   
};

console.log(mergeTwoLists(list1,list2))
