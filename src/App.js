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
import FileManager from './utils/FileManager';
import D3Graph from './utils/D3Graph';
import { Button, Tabs, Tab, Modal } from 'react-bootstrap';

let globalEditor = null;

export default function StrudelDemo() {
    
    const hasRun = useRef(false);
    const fileInputRef = useRef(null);
    const [d3Data, setD3Data] = useState([]);
    const [activeTab, setActiveTab] = useState('controls');
    const [showD3Modal, setShowD3Modal] = useState(false);

    const handlePlay = () => {
        let melodyNumberToUse = randomMelodyNumber;
        
        if (randomMelodyEnabled) {
            const valueToCommit = randomMelodyNumberInput === '' ? 1 : randomMelodyNumberInput;
            setRandomMelodyNumber(valueToCommit);
            setRandomMelodyNumberInput(valueToCommit);
            melodyNumberToUse = valueToCommit;
        }

        let outputText = Preprocess({
            inputText: procText,
            volume: volume,
            hiHatEnabled: hiHatEnabled,
            pulseSynthEnabled: pulseSynthEnabled,
            supersawEnabled: supersawEnabled,
            basslineEnabled: basslineEnabled,
            randomMelodyEnabled: randomMelodyEnabled,
            randomMelodyNumber: melodyNumberToUse,
            basslineDistortAmount: basslineDistortAmount,
            basslineDistortCurve: basslineDistortCurve,
            distortionEnabled: distortionEnabled
        });
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

    const handleDistortionToggle = () => {
    setDistortionEnabled(prev => !prev);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSaveSettings = () => {
        const settings = {
            volume,
            hiHatEnabled,
            pulseSynthEnabled,
            supersawEnabled,
            basslineEnabled,
            randomMelodyEnabled,
            randomMelodyNumber,
            randomMelodyNumberInput,
            basslineDistortAmount,
            basslineDistortCurve,
            distortionEnabled
        };
        FileManager.save(settings);
    };

    const handleLoadSettings = (e) => {
        const file = e.target.files[0];
        if (file) {
            FileManager.load(file, (loadedSettings) => {
                if (loadedSettings.volume !== undefined) setVolume(loadedSettings.volume);
                if (loadedSettings.hiHatEnabled !== undefined) setHiHatEnabled(loadedSettings.hiHatEnabled);
                if (loadedSettings.pulseSynthEnabled !== undefined) setPulseSynthEnabled(loadedSettings.pulseSynthEnabled);
                if (loadedSettings.supersawEnabled !== undefined) setSupersawEnabled(loadedSettings.supersawEnabled);
                if (loadedSettings.basslineEnabled !== undefined) setBasslineEnabled(loadedSettings.basslineEnabled);
                if (loadedSettings.randomMelodyEnabled !== undefined) setRandomMelodyEnabled(loadedSettings.randomMelodyEnabled);
                if (loadedSettings.randomMelodyNumber !== undefined) setRandomMelodyNumber(loadedSettings.randomMelodyNumber);
                if (loadedSettings.randomMelodyNumberInput !== undefined) setRandomMelodyNumberInput(loadedSettings.randomMelodyNumberInput);
                if (loadedSettings.basslineDistortAmount !== undefined) setBasslineDistortAmount(loadedSettings.basslineDistortAmount);
                if (loadedSettings.basslineDistortCurve !== undefined) setBasslineDistortCurve(loadedSettings.basslineDistortCurve);
                if (loadedSettings.distortionEnabled !== undefined) setDistortionEnabled(loadedSettings.distortionEnabled);
            }, () => {
                e.target.value = null;
            });
        }
    };

    const [procText, setProcText] = useState(algorave_dave_tune)

    const [volume, setVolume] = useState(1);

    const [state, setState] = useState("stop");

    const [hiHatEnabled, setHiHatEnabled] = useState(true);

    const [pulseSynthEnabled, setPulseSynthEnabled] = useState(true);
    
    const [supersawEnabled, setSupersawEnabled] = useState(true);
    
    const [basslineEnabled, setBasslineEnabled] = useState(true);
    
    const [randomMelodyEnabled, setRandomMelodyEnabled] = useState(true);
    
    const [randomMelodyNumber, setRandomMelodyNumber] = useState(5);
    
    const [randomMelodyNumberInput, setRandomMelodyNumberInput] = useState(5);
    
    const [basslineDistortAmount, setBasslineDistortAmount] = useState(2.1);
    
    const [basslineDistortCurve, setBasslineDistortCurve] = useState(0.4);
    
    const [distortionEnabled, setDistortionEnabled] = useState(false);

    const handleRandomMelodyNumberChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            setRandomMelodyNumberInput('');
            return;
        }
        const numValue = Number(value);
        if (!isNaN(numValue) && numValue >= 0) {
            setRandomMelodyNumberInput(numValue);
        }
    };

    const handleRandomMelodyNumberKeyDown = (e) => {
        if (e.key === 'Enter') {
            const valueToCommit = randomMelodyNumberInput === '' ? 1 : randomMelodyNumberInput;
            setRandomMelodyNumber(valueToCommit);
            setRandomMelodyNumberInput(valueToCommit);
        }
    };


    const handleBasslineDistortAmountChange = (e) => {
      const newValue = Number(e.target.value);
      setBasslineDistortAmount(newValue);
      if (e.type === 'mouseup' && state === "play") {
        setTimeout(() => handlePlay(), 0);
      }
    };

    const handleBasslineDistortCurveChange = (e) => {
      const newValue = Number(e.target.value);
      setBasslineDistortCurve(newValue);
      if (e.type === 'mouseup' && state === "play") {
        setTimeout(() => handlePlay(), 0);
      }
    };

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
        if (state === "play") {
            handlePlay();
        }
    }, [randomMelodyNumber]);

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [distortionEnabled]);

    useEffect(() => {

    if (!hasRun.current) {
        const handleD3Data = (event) => {
            setD3Data(event.detail);
        };
        
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
        <h2 style={{ textAlign: 'center', fontSize: 40 }}>$7RµDΞL_R∆VΞ</h2>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Button 
                variant="outline-success" 
                size="sm" 
                onClick={handleSaveSettings}
                style={{ marginRight: '10px' }}
            >
                $∆VΞ_$Ξ77IΝG$
            </Button>
            <Button 
                variant="outline-success" 
                size="sm" 
                onClick={triggerFileInput}
            >
                L0∆D_$Ξ77IΝG$
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleLoadSettings}
                style={{ display: 'none' }}
            />
        </div>
        <main>
            <div className="container-fluid">
                <div className="row" style={{ minHeight: '80vh' }}>
                    <div className="col-md-7" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div className="editor-container" style={{ height: '45vh' }}>
                            <PreprocTextArea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} id="proc" />
                        </div>
                        <div className="editor-container" style={{ height: '45vh' }}>
                            <div id="editor" />
                        </div>
                    </div>
                    <div className="col-md-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <button 
                                className="btn btn-outline-primary btn-full"
                                onClick={() => setShowD3Modal(true)}
                            >
                                ∆µD10_LΞVΞL$_GR∆PH
                            </button>
                        </div>
                        <DJControls 
                          volume={volume} 
                          onVolumeChange={(e) => setVolume(Number(e.target.value))} 
                          hiHatEnabled={hiHatEnabled} 
                          onHiHatToggle={handleHiHatToggle} 
                          pulseSynthEnabled={pulseSynthEnabled} 
                          onPulseSynthToggle={handlePulseSynthToggle} 
                          supersawEnabled={supersawEnabled} 
                          onSupersawToggle={handleSupersawToggle} 
                          basslineEnabled={basslineEnabled} 
                          onBasslineToggle={handleBasslineToggle} 
                          randomMelodyEnabled={randomMelodyEnabled} 
                          onRandomMelodyToggle={handleRandomMelodyToggle} 
                          randomMelodyNumber={randomMelodyNumberInput}
                          onRandomMelodyNumberChange={handleRandomMelodyNumberChange}
                          onRandomMelodyNumberKeyDown={handleRandomMelodyNumberKeyDown}
                          basslineDistortAmount={basslineDistortAmount}
                          onBasslineDistortAmountChange={handleBasslineDistortAmountChange}
                          basslineDistortCurve={basslineDistortCurve}
                          onBasslineDistortCurveChange={handleBasslineDistortCurveChange}
                          distortionEnabled={distortionEnabled}
                          onDistortionToggle={handleDistortionToggle}
                        />
                        <nav style={{ marginTop: '10px' }}>
                            <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                        </nav>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
        
        <Modal show={showD3Modal} onHide={() => setShowD3Modal(false)} size="xl" centered style={{ '--bs-modal-width': '117%' }}>
            <Modal.Header closeButton>
                <Modal.Title style={{ width: '100%', textAlign: 'center', marginRight: '32px' }}>∆µD10_LΞVΞL$_GR∆PH</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '60px' }}>
                <D3Graph data={d3Data} />
            </Modal.Body>
        </Modal>
    </div >
);


}