import './perm.js'
import stage from './stage.js'

const p = stage.perm()
stage.style({display: 'block'})


let vw, vh, vw_d2, vh_d2, panx, pany, scale
panx = pany = 0

window.addEventListener('resize', onresize)
stage.on('wheel', onwheel)
stage.on('contextmenu', oncontextmenu)
updateStageSize()
scale = 0.9 * (vw < vh ? vw : vh)
updateTransform()

function updateStageSize() {
  vw = window.innerWidth
  vh = window.innerHeight
  if(vw % 2) --vw
  if(vh % 2) --vh
  vw_d2 = vw * 0.5
  vh_d2 = vh * 0.5
  stage.size(vw, vh)
}

function onresize() {
  updateStageSize()
  updateTransform()
}

function updateTransform() {
  p.x(vw_d2 + panx)
  p.y(vh_d2 + pany)
  p.attr({
    cx: vw_d2 + panx,
    cy: vh_d2 + pany,
    transform: `matrix(${scale},0,0,${scale},${vw_d2 + panx * scale},${vh_d2 + pany * scale})`
  })
}

function onwheel(e) {
  e.preventDefault()
  if(e.deltaY < 0) {
    scale /= 0.9
  } else {
    scale *= 0.9
  }
  updateTransform()
}

function oncontextmenu(e) {
  e.preventDefault()
  const x = e.offsetX - vw_d2
  const y = e.offsetY - vh_d2
  panx -= x / scale
  pany -= y / scale
  updateTransform()
}
