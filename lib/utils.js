export const parseDetails = (details) => {
  
  let str = details;

  str=str.replaceAll("\\n", "");
  str=str.replaceAll("&ngsp;", "");
  
  let parsedDetails = "";
  let addStatus = true;
  for (let i=0; i<str.length; i++){
    if (str.charAt(i)==='<'){
      addStatus=false;
      continue;
    } else if (str.charAt(i)==='>'){
      addStatus=true;
      continue;
    } else if (addStatus){
      parsedDetails+=str.charAt(i);
    }
  }
  parsedDetails=parsedDetails.replaceAll("&lt;", "<");
  
  return parseDetails;

}