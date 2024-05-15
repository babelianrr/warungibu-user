export default function tokenConverter(num) {
  if (!num) {
    return '-'
  }

  // return num.toLocaleString({minimumFractionDigits: 0})
  let number=0
  let result = num.split("").map((item) => {
    number+=1
    if(number == 4){
      number=0
      return `${item} `
    }else{
      return `${item}`
    }
  })
  return result.join().replaceAll(',',"")
}

