import app from './ui/app'

function test1() {
  const tree = app.start()
  document.body.appendChild(tree)
}

test1()
