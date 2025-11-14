function DJControls({ volume, onVolumeChange }) {
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
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="s1"/>
                    <label className="form-check-label" htmlFor="s1">
                        s1
                    </label>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                h1_h@t$
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d1"/>
                    <label className="form-check-label" htmlFor="d1">
                        d1
                    </label>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                b@$$_l1n3
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="cpm_label">set_cpm</span>
                    <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label"/>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
                r@nd0m_m3l0dy
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show">
              <div className="accordion-body">
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
