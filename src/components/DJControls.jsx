function DJControls({ volume, onVolumeChange, hiHatEnabled, onHiHatToggle, pulseSynthEnabled, onPulseSynthToggle, supersawEnabled, onSupersawToggle, basslineEnabled, onBasslineToggle, randomMelodyEnabled, onRandomMelodyToggle, randomMelodyNumber, onRandomMelodyNumberChange, onRandomMelodyNumberKeyDown, basslineDistortAmount, onBasslineDistortAmountChange, basslineDistortCurve, onBasslineDistortCurveChange, distortionEnabled, onDistortionToggle }) {
  return (
    <>
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Pµ1$Ξ_§YN7H
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Pulse-synth toggle">
                  <button 
                    className={pulseSynthEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onPulseSynthToggle}
                  >
                    {pulseSynthEnabled ? "Pµ1$Ξ_§YN7H_!$_0N :)" : "Pµ1$Ξ_§YN7H_!$_0FF :("}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                H1_H∆7$
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
              <div className="accordion-body">               
                <div className="btn-group-full" role="group" aria-label="Hi-hat toggle">
                  <button 
                    className={hiHatEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onHiHatToggle}
                  >
                    {hiHatEnabled ? "H1_H∆7$_∆RΞ_0N :)" : "H1_H∆7$_∆RΞ_0FF :("}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                5µPΞR$∆W
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Supersaw toggle">
                  <button 
                    className={supersawEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onSupersawToggle}
                  >
                    {supersawEnabled ? "5µPΞR$∆W_!$_0N :)" : "5µPΞR$∆W_!$_0FF :("}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
                B∆$$_L1NΞ
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Bassline toggle">
                  <button 
                    className={basslineEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onBasslineToggle}
                  >
                    {basslineEnabled ? "B∆$$_L1NΞ_!$_0N :)" : "B∆$$_L1NΞ_!$_0FF :("}
                  </button>
                </div>
                <div className="text-center" style={{ marginTop: '30px', marginBottom: '20px' }}>
                  <label htmlFor="basslineDistortAmount" className="form-label" style={{ opacity: !basslineEnabled ? 0.5 : 1 }}>{!basslineEnabled ? "0FFL1NΞ :(" : "D1570R710N_∆M0µN7"}</label>
                  {/* Slider disabled if either distortion or bassline is turned off */}
                  <input 
                    type="range" 
                    className="form-range" 
                    id="basslineDistortAmount" 
                    min="0.2" 
                    max="4" 
                    step="0.1" 
                    value={basslineDistortAmount}
                    onChange={onBasslineDistortAmountChange}
                    onMouseUp={onBasslineDistortAmountChange}
                    disabled={!distortionEnabled || !basslineEnabled}
                  />
                  <output htmlFor="basslineDistortAmount" aria-hidden="true" style={{ opacity: !basslineEnabled ? 0.5 : 1 }}>{basslineDistortAmount}</output>
                </div>
                <div className="text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <label htmlFor="basslineDistortCurve" className="form-label" style={{ opacity: !basslineEnabled ? 0.5 : 1 }}>{!basslineEnabled ? "∆L$0_0FFL1NΞ :(" : "D1570R710N_CµRVΞ"}</label>
                  <input 
                    type="range" 
                    className="form-range" 
                    id="basslineDistortCurve" 
                    min="0.1" 
                    max="0.7" 
                    step="0.1" 
                    value={basslineDistortCurve}
                    onChange={onBasslineDistortCurveChange}
                    onMouseUp={onBasslineDistortCurveChange}
                    disabled={!distortionEnabled || !basslineEnabled}
                  />
                  <output htmlFor="basslineDistortCurve" aria-hidden="true" style={{ opacity: !basslineEnabled ? 0.5 : 1 }}>{basslineDistortCurve}</output>
                </div>
                <div className="form-check form-switch" style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="distortionSwitch"
                    checked={distortionEnabled}
                    onChange={onDistortionToggle}
                    style={{ marginRight: '8px' }}
                    disabled={!basslineEnabled}
                  />
                  <label className="form-check-label" htmlFor="distortionSwitch">
                    {!basslineEnabled ? "¥ΞP_7H1$_I$_0FFL1NΞ_@$_WΞLL :(" : (distortionEnabled ? "D1570R710N_ΞN∆BLΞD" : "D1570R710N_D154B|ΞD")}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="true" aria-controls="panelsStayOpen-collapseFive">
                R∆ND0M_MΞL0D¥
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Random Melody toggle">
                  <button 
                    className={randomMelodyEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onRandomMelodyToggle}
                  >
                    {randomMelodyEnabled ? "R∆ND0M_MΞL0D¥_!$_0N :)" : "R∆ND0M_MΞL0D¥_!$_0FF :("}
                  </button>
                </div>
                <div className="input-group mb-3" style={{marginTop: '10px'}}>
                    <span className="input-group-text" id="rand_melody_label">R∆ND0M_MΞL0D¥_NµMß3R:</span>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="rand_melody_text_input" 
                      placeholder={randomMelodyEnabled ? "5" : "0FFL1NΞ :("} 
                      aria-label="Random Melody" 
                      aria-describedby="rand_melody_label" 
                      min="0" 
                      value={randomMelodyEnabled ? randomMelodyNumber : ''} 
                      onChange={onRandomMelodyNumberChange}
                      onKeyDown={onRandomMelodyNumberKeyDown}
                      disabled={!randomMelodyEnabled}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-2" style={{ marginTop: '15px' }}>
            <label htmlFor="volume_range" className="form-label">V0|µMΞ</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />
        </div>

    </>
  );
}

export default DJControls;
