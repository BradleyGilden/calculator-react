ipt = ipt.split('')
let size = ipt.length;
let i = 0;

while (i < size) {
  if (ipt[i] === '.' && ipt[i - 1] && ipt[i + 1]) {
    ipt.splice(i - 1, 3, `${ipt[i - 1]}.${ipt[i + 1]}`)
    size--;
  }
  i++;
}
return ipt;
