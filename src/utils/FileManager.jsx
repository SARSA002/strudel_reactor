function FileManager() { }

FileManager.save = function (controls) {
    try {
        const json = JSON.stringify(controls, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'strudel_settings.json'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err) {
        alert('Error saving settings');
    }
};

FileManager.load = function (file, setControls, resetFileInput) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const text = event.target.result;
            const loadedControls = JSON.parse(text);

            if (loadedControls.volume !== undefined) {
                loadedControls.volume = parseFloat(loadedControls.volume);
            }
            if (loadedControls.randomMelodyNumber !== undefined) {
                loadedControls.randomMelodyNumber = parseFloat(loadedControls.randomMelodyNumber);
            }
            if (loadedControls.randomMelodyNumberInput !== undefined) {
                loadedControls.randomMelodyNumberInput = parseFloat(loadedControls.randomMelodyNumberInput);
            }
            if (loadedControls.basslineDistortAmount !== undefined) {
                loadedControls.basslineDistortAmount = parseFloat(loadedControls.basslineDistortAmount);
            }
            if (loadedControls.basslineDistortCurve !== undefined) {
                loadedControls.basslineDistortCurve = parseFloat(loadedControls.basslineDistortCurve);
            }

            setControls(loadedControls);
            if (resetFileInput) resetFileInput();
        } catch (error) {
            alert('Error loading settings');
            if (resetFileInput) resetFileInput();
        }
    };

    reader.onerror = () => {
        alert('Error reading file');
        if (resetFileInput) resetFileInput();
    };

    reader.readAsText(file);
};

export default FileManager;
