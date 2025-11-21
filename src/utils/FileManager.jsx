function FileManager() { }

// Exports settings object as downloadable JSON file
FileManager.save = function (controls) {
    try {
        // Convert JavaScript object to JSON string 
        const json = JSON.stringify(controls, null, 2);
        // Create a Blob (binary data) from the JSON string
        const blob = new Blob([json], { type: 'application/json' });
        // Generate temporary URL pointing to the Blob
        const url = URL.createObjectURL(blob);
        // Create and click download link
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

// Reads JSON file and parses it back into JavaScript object
FileManager.load = function (file, setControls, resetFileInput) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const text = event.target.result;
            const loadedControls = JSON.parse(text);

            // Convert string numbers back to actual numbers (JSON stores everything as strings)
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
