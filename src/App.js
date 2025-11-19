import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune, algorave_dave_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocTextArea from './components/PreprocTextArea';
import { Preprocess } from './utils/PreprocessLogic';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {
    
    const hasRun = useRef(false);

    const handlePlay = () => {

        let outputText = Preprocess({ inputText: procText, volume: volume, hiHatEnabled: hiHatEnabled, pulseSynthEnabled: pulseSynthEnabled, supersawEnabled: supersawEnabled, basslineEnabled: basslineEnabled, randomMelodyEnabled: randomMelodyEnabled });
        // restart the editor to ensure changes
        if (globalEditor && typeof globalEditor.stop === 'function') {
            try { globalEditor.stop(); } catch (e) { /* ignore */ }
        }
        globalEditor.setCode(outputText);
        globalEditor.evaluate();
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const handleHiHatToggle = () => {
    setHiHatEnabled(prev => !prev);
    };

    const handlePulseSynthToggle = () => {
    setPulseSynthEnabled(prev => !prev);
    };

    const handleSupersawToggle = () => {
    setSupersawEnabled(prev => !prev);
    };
    
    const handleBasslineToggle = () => {
    setBasslineEnabled(prev => !prev);
    };

    const handleRandomMelodyToggle = () => {
    setRandomMelodyEnabled(prev => !prev);
    };

    const [procText, setProcText] = useState(algorave_dave_tune)

    const [volume, setVolume] = useState(1);

    const [state, setState] = useState("stop");

    const [hiHatEnabled, setHiHatEnabled] = useState(true);

    const [pulseSynthEnabled, setPulseSynthEnabled] = useState(true);
    const [supersawEnabled, setSupersawEnabled] = useState(true);
    
    const [basslineEnabled, setBasslineEnabled] = useState(true);
    
    const [randomMelodyEnabled, setRandomMelodyEnabled] = useState(true);

    useEffect(() => {

        if (state === "play") {
            handlePlay();
        }

    }, [volume])

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [hiHatEnabled]);

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [pulseSynthEnabled]);

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [supersawEnabled]);

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [basslineEnabled]);

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [randomMelodyEnabled]);

    useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = procText
        globalEditor.setCode(procText)

    }

}, [procText]);

return (
    <div>
        <h2 style={{ textAlign: 'center', fontSize: 40 }}>$trud3l_r@v3</h2>
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 editor-container">
                        <PreprocTextArea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} id="proc" />
                    </div>
                    <div className="col-md-4">
                        <DJControls volume={volume} onVolumeChange={(e) => setVolume(Number(e.target.value))} hiHatEnabled={hiHatEnabled} onHiHatToggle={handleHiHatToggle} pulseSynthEnabled={pulseSynthEnabled} onPulseSynthToggle={handlePulseSynthToggle} supersawEnabled={supersawEnabled} onSupersawToggle={handleSupersawToggle} basslineEnabled={basslineEnabled} onBasslineToggle={handleBasslineToggle} randomMelodyEnabled={randomMelodyEnabled} onRandomMelodyToggle={handleRandomMelodyToggle} />
                        <nav>
                            <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 editor-container">
                        <div id="editor" />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}