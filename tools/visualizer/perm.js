import stage from './stage.js'

const {PI,cos,sin,floor} = Math
const PI_T2 = PI * 2
const symbols = {
  circle: stage.symbol().circle(1).stroke({width: 0.01}).fill('#ffffff').x(-0.5).y(-0.5)
}

SVG.Perm = SVG.invent({

  create: 'g',

  inherit: SVG.G,

  extend: {

    createChildPerms() {
      const level = this.level + 1
      const arc = PI_T2 / level
      const childPerms = this.childPerms = []
      let a = PI
      let perm = this.permArr.slice(0)
      perm.push(level)

      for(let p = 0; p < level; ++p) {
        const c = this.perm(perm.slice(0))
        childPerms.push(c)
        c.x(cos(a)*0.33)
        c.y(sin(a)*0.33)
        c.scale(0.23 + 0.1 - level * 0.01)
        a = a + arc
        perm.unshift(perm.pop())
      }
      this.permText.size(0.15 - level * 0.011)
    },

    expand() {
      if(this.isExpanded) {
        for(let c of this.childPerms) c.expand()
      } else {
        if(this.level < 7) {
          this.isExpanded = true
          this.createChildPerms()
        }
      }
    }

  },

  construct: {

    perm(perm) {
      const p = new SVG.Perm
      let level
      //p.outerCircle = p.use(symbols.circle)
      p.innerCircle = p.use(symbols.circle).transform({scale: 1}).style({cursor: 'pointer'})
      p.innerCircle.on('click', ()=>p.expand())
      if(this instanceof SVG.Perm) {
        level = p.level = this.level + 1
        p.permArr = perm
      } else {
        level = p.level = 1
        perm = p.permArr = [1]
      }
      const permText = perm.join('')
      p.permText = p.text('').size(0.15).attr({
        'text-anchor': 'middle',
        'dominant-baseline': 'middle'
      }).style({cursor: 'pointer', 'pointer-events': 'none', 'user-select': 'none'})
      p.permText.tspan(permText)
      return this.put(p)
    }
  }

})
