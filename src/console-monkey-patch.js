let originalLog = null;
// Tracks current audio level for each instrument
const levels = { pulse: 0, hihat: 0, supersaw: 0, bassline: 0, melody: 0 };

const emitChange = () => {
    const detail = Object.entries(levels).map(([ch, val]) => `${ch}:${val.toFixed(3)}`);
    document.dispatchEvent(new CustomEvent("d3Data", { detail }));
};

// Identifies which instrument channel based on orbit number
function detectChannel(text) {
    const lower = text.toLowerCase();

    if (lower.includes('orbit:4')) return 'pulse';
    if (lower.includes('orbit:5')) return 'hihat';
    if (lower.includes('orbit:3')) return 'supersaw';
    if (lower.includes('orbit:1') || lower.includes('_scope')) return 'bassline';
    if (lower.includes('orbit:2') || lower.includes('_pianoroll')) return 'melody';

    return null;
}

export default function console_monkey_patch() {
    if (originalLog) return;
    originalLog = console.log;

    // Replace console.log with custom function that extracts audio data
    console.log = function (...args) {
        const logText = args.join(" ");

        if (logText.startsWith("%c[hap] ")) {
            const cleanLog = logText.replace("%c[hap] ", "");
            const gainMatch = cleanLog.match(/gain:([\d.]+)/);

            if (gainMatch) {
                const channel = detectChannel(cleanLog);
                if (channel) {
                    levels[channel] = Math.max(levels[channel] * 0.8, parseFloat(gainMatch[1]));
                    emitChange();
                }
            }
        }
        originalLog.apply(console, args);
    };

    // Gradually decrease audio levels over time for smooth animation
    setInterval(() => {
        let changed = false;
        for (const ch in levels) {
            if (levels[ch] > 0) {
                levels[ch] = levels[ch] > 0.01 ? levels[ch] * 0.92 : 0;
                changed = true;
            }
        }
        if (changed) emitChange();
    }, 50);
}

export function getD3Data() {
    return Object.entries(levels).map(([ch, val]) => `${ch}:${val.toFixed(3)}`);
}

export function subscribe(eventName, listener) {
    document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, listener);
}