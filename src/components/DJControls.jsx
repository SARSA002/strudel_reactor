function DJControls({ volume, onVolumeChange, hiHatEnabled, onHiHatToggle, pulseSynthEnabled, onPulseSynthToggle, supersawEnabled, onSupersawToggle, basslineEnabled, onBasslineToggle, randomMelodyEnabled, onRandomMelodyToggle }) {
  return (
    <>
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                pu1$3_$yn7h
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Pulse-synth toggle">
                  <button 
                    className={pulseSynthEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onPulseSynthToggle}
                  >
                    {pulseSynthEnabled ? "pu1$3_$yn7h !$ 0n :)" : "pu1$3_$yn7h !$ 0ff :("}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                h1_h@t
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
              <div className="accordion-body">               
                <div className="btn-group-full" role="group" aria-label="Hi-hat toggle">
                  <button 
                    className={hiHatEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onHiHatToggle}
                  >
                    {hiHatEnabled ? "h1_h@t !$ 0n :)" : "h1_h@t !$ 0ff :("}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                supersaw
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Supersaw toggle">
                  <button 
                    className={supersawEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onSupersawToggle}
                  >
                    {supersawEnabled ? "supersaw !$ 0n :)" : "supersaw !$ 0ff :("}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
                b@$$_l1n3
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Bassline toggle">
                  <button 
                    className={basslineEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onBasslineToggle}
                  >
                    {basslineEnabled ? "b@$$_l1n3 !$ 0n :)" : "b@$$_l1n3 !$ 0ff :("}
                  </button>
                </div>
                <div className="input-group mb-3" style={{marginTop: '10px'}}>
                    <span className="input-group-text" id="cpm_label">set_cpm</span>
                    <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label"/>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="true" aria-controls="panelsStayOpen-collapseFive">
                r@nd0m_m3l0dy
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="btn-group-full" role="group" aria-label="Random Melody toggle">
                  <button 
                    className={randomMelodyEnabled ? "btn btn-outline-success btn-full" : "btn btn-outline-danger btn-full"}
                    onClick={onRandomMelodyToggle}
                  >
                    {randomMelodyEnabled ? "r@nd0m_m3l0dy !$ 0n :)" : "r@nd0m_m3l0dy !$ 0ff :("}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-2" style={{ marginTop: '15px' }}>
            <label htmlFor="volume_range" className="form-label">v0|um3</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />
        </div>

    </>
  );
}

export default DJControls;
