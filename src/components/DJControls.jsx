function DJControls() {
  return (
    <>
        <div class="input-group mb-3">
            <span class="input-group-text" id="cpm_label">setCPM</span>
            <input type="text" class="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label"/>
        </div>

        <label for="volume_range" className="form-label">Volume</label>
        <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range"/>

        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="s1"/>
                <label class="form-check-label" for="s1">
                    s1
                </label>
        </div>
        
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="d1"/>
                <label class="form-check-label" for="d1">
                    d1
                </label>
        </div>

    </>
  );
}

export default DJControls;
