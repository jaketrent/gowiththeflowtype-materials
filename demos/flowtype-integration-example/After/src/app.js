function go() {
  const a = parseInt(document.getElementById('a').value, 10)
  const b = parseInt(document.getElementById('b').value, 10)
  document.getElementById('result').value = add(a, b)
}

document.getElementById('add').addEventListener('click', go)
