export function Preprocess ({ inputText, volume, hiHatEnabled, pulseSynthEnabled, supersawEnabled, basslineEnabled, randomMelodyEnabled, randomMelodyNumber, basslineDistortAmount, basslineDistortCurve, distortionEnabled }) {
    
    //console.log(inputText)

    let outputText = inputText;

    outputText += `\n//all(x => x.gain(${volume}))`

    outputText = outputText.replaceAll("{$VOLUME}", volume)


    const hhPattern = hiHatEnabled 
        ? "~ hh:8 ~ hh:8 ~ hh:8 ~ hh:8"
        : "~";    

    const psPattern = pulseSynthEnabled 
        ? "pulse"
        : "~";    

    const ssPattern = supersawEnabled
        ? "supersaw"
        : "~";

    const blPattern = basslineEnabled 
        ? (distortionEnabled ? `s("sbd!4").distort("${basslineDistortAmount}:${basslineDistortCurve}")` : `s("sbd!4")`)
        : `s("~")`;
    
    const rmPattern = randomMelodyEnabled 
        ? `n(irand(${randomMelodyNumber}).sub(7).seg(8))`
        : "n('~')";

    outputText = outputText.replaceAll("{$HH_PATTERN}", hhPattern);
    outputText = outputText.replaceAll("{$PS_PATTERN}", psPattern);
    outputText = outputText.replaceAll("{$SS_PATTERN}", ssPattern);
    outputText = outputText.replaceAll("{$BS_PATTERN}", blPattern);
    outputText = outputText.replaceAll("{$RM_PATTERN}", rmPattern);

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;

    let matches = []

    while ((m = regex.exec(outputText)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            //console.log(`Found match, group ${groupIndex}: ${match}`);
            matches.push(match)
        });
    }

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    
    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText);

    console.log(matches3);

    return matches3;
}