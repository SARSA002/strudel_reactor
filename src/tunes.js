export const algorave_dave_tune = `setcps(140/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')

const pattern = 0

pulse_synth:
s("pulse")
.orbit(4)
.seg(16)
.dec(.1)
.fm("2")
.fmh(2.04)
.gain(1)

hi_hats:
s("{$HH_PATTERN}")
.gain(1)
.room(.3)
.orbit(5)
.lpf(8000)

supersaw_pad:
s("supersaw")
.detune(1)
.rel(2.5)
.beat(2, 32)
.slow(2)
.orbit(3)
.fm("2")
.fmh(2.04)
.room(1)
.roomsize(3)
.gain(1)

melody:
n(irand(5)
.sub(7)
.seg(16))
.scale("c:minor")
.rib(46,1)
.distort("1:.5")
.s("sawtooth")
.lpf(200)
.lpenv(2)
.lpq(12)
.orbit(2)
.gain(1)
._pianoroll()

kick:
s("sbd!4")
.duck("2:3:4:5:6")
.duckattack(.2)
.duckdepth(.8)
.distort("2:.5")
.gain(1)
._scope()

// @version 1.2`;