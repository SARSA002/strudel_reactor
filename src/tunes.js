export const algorave_dave_tune = `setcps(140/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')

const pattern = 0

pulse_synth:
s("{$PS_PATTERN}")
.orbit(4)
.seg(8)
.dec(.1)
.fm("2")
.fmh(4)
.gain(2)

hi_hats:
s("{$HH_PATTERN}")
.gain(1.25)
.room(.3)
.orbit(5)
.lpf(8000)

supersaw_pad:
s("{$SS_PATTERN}")
.detune(0.5)
.rel(2)
.beat(2, 32)
.slow(2)
.orbit(3)
.fm("2")
.fmh(3)
.gain(0.75)


bassline:
{$BS_PATTERN}
.duck("2:3:4:5:6")
.duckattack(.2)
.duckdepth(.8)
.gain(1)
._scope()


melody:
{$RM_PATTERN}
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

// @version 1.2`;